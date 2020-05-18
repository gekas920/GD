import {Request, Response} from "express";
const db = require('../models');
const Files = require('./FilesController');
const fs = require('fs');



class PollsController{
    private getVoices(arr:any[]){
        let id:number = arr[0].dataValues.pollId;
        let res: number[] = [];
        let countVoices = arr[0].dataValues.count;
        for (let i = 1; i < arr.length; i++){
            if(arr[i].dataValues.pollId <= id){
                countVoices+=arr[i].dataValues.count
            }
            else {
                res.push(countVoices);
                countVoices = 0;
                id = arr[i].dataValues.count;
            }
            if(i === arr.length - 1){
                res.push(countVoices);
            }
        }
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
            attributes:['pollId','count'],
            include:[{
                model:db.Poll
            }]
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

    public getPoll(request:Request,response:Response){

    }
}
module.exports = new PollsController();