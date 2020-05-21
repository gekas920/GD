import {Request, Response} from "express";
import {Field, Poll} from "./interfaces";

const db = require('../models');
const Files = require('./FilesController');
const fs = require('fs');



class PollsController{
    private comparePolls = (a:any, b:any)=> {
        const A = parseInt(a.dataValues.pollId);
        const B = parseInt(b.dataValues.pollId);

        let comparison = 0;
        if (A > B) {
            comparison = 1;
        } else if (A < B) {
            comparison = -1;
        }
        return comparison;
    };
    private getVoices(arr:any[]){
        let pollId = arr[0].dataValues.pollId;
        let res: number[] = [];
        let cnt = 0;
        arr.sort(this.comparePolls);
        arr.forEach((elem,index)=>{
            if(elem.dataValues.pollId === pollId){
                cnt+=elem.dataValues.count;
            }
            else {
                res.push(cnt);
                cnt = elem.dataValues.count;
                pollId = elem.dataValues.pollId;
            }
            if(index === arr.length-1){
                res.push(cnt);
            }
        });
        return res
    }

    private correctObj(obj:any){
        let newObj = Object.assign({},obj);
        let lastValue = Object.keys(newObj)[Object.keys(newObj).length-1];
        if(lastValue !== 'title'){
            delete newObj[lastValue];
            return {...newObj,correct:lastValue.split('')[0]}
        }
        else return newObj
    }

    private clearFields(obj:any){
        let newObj = Object.assign({},obj);
        for(let key in newObj){
            if (key.length > 1)
                delete newObj[key]
        }
        return newObj
    }

    public async get(request: Request, response: Response) {
        const Poll = await db.Poll.findAll();
        const Fields = await db.Field.findAll({
            include:db.Poll
        });
        let arr = this.getVoices(Fields);
        let result = Poll.map((elem:any,index:number)=>{
            return {
                id:elem.dataValues.id,
                description:elem.dataValues.description,
                count:arr[index]
            }
        });
        response.send(result)
    }

    public async create(request:Request,response: Response){
        delete request.body.file;
        let body = request.body;
        body = this.correctObj(body);
        let fields = this.clearFields(body);
        let poll = await db.Poll.findOrCreate({
            where:{
                description:body.title
            },
            defaults:{
                description:body.title,
                draft:body.draft,
                userId:response.locals.user_id,
            }
        }).then(([poll,created]:[any,boolean])=>{
            if(created){
                response.send(200);
                let id = poll.dataValues.id;
                fs.mkdirSync(__dirname + `/../PollsFiles/${id}`);
                if(!body.correct)
                    body.correct = false;
                Object.values(fields).forEach((elem,index)=>{
                    db.Field.create({
                        name:elem,
                        count:0,
                        correct:Object.keys(fields)[index].toString() === body.correct.toString(),
                        pollId:id
                    })
                });
                // @ts-ignore
                const arr = Object.values(request.files);
                Files.uploadPollFile(request,response,id);
            }
            else {
                response.sendStatus(409)
            }
        });
    }

    public async delete(request:Request,response:Response){
        await db.Poll.findOne({
            where:{
                id:request.params.id
            }
        }).then((poll:any)=>{
            poll.destroy().then((result:any)=>{
                response.sendStatus(200);
            })
                .catch((err:Error)=>{
                    console.log(err);
                    response.sendStatus(500);
                })
        })
    }

    public async getPoll(request:Request,response:Response){
        const Fields = await db.Field.findAll({
            where:{
                pollId:request.params.id
            },
            include:db.Poll
        });
        const FieldArr:Field[] = Fields.map((elem:any)=>{
           return {
               option:elem.dataValues.name,
               votes:elem.dataValues.count,
               correct:elem.dataValues.correct
           }
        });
        fs.readdir(__dirname + `/../PollsFiles/${Fields[0].dataValues.Poll.dataValues.id}`, (err:Error, files:[]) => {
            let arr;
            try {
                arr = files.map((file) => {
                    return `http://localhost:3000/polls/${Fields[0].dataValues.Poll.dataValues.id}/${file}`
                });
            }
            catch (e) {
                arr = ''
            }
            const poll:Poll = {
                title:Fields[0].dataValues.Poll.dataValues.description,
                fields:FieldArr,
                images:arr
            };
            response.send(poll);
        })
    }

    public async update(request:Request,response:Response){
        let fields = await db.Field.findAll({
            where: {
                pollId: request.params.id
            }
        });
        fields.forEach((elem:any,index:number)=>{
            elem.update({
                count:request.body[index].votes
            })
        })
    }
}
module.exports = new PollsController();