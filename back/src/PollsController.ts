import {Request, Response} from "express";
import {Field, Poll} from "./interfaces";
const db = require('../models');
const Files = require('./FilesController');
const fs = require('fs');
const rimraf = require("rimraf");
const CategoriesController = require('./CategoriesController');


class PollsController{
    public comparePolls = (a:any, b:any)=> {
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
    public getVoices(arr:any[]){
        arr.sort(this.comparePolls);
        let pollId = arr[0].dataValues.pollId;
        let res: number[] = [];
        let cnt = 0;
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

    public async get(request: Request, response: Response,id?:string) {
        let Poll:any[];
        let Fields;
        if(id){
             Poll = await db.Poll.findAll({
                where:{
                    userId:id
                }
            });
             Fields = Promise.all(Poll.map(async (elem:any)=>{
                 return await db.Field.findAll({
                     where: {
                         pollId: elem.dataValues.id
                     }
                 })
             }));
             Fields.then((res:any)=>{
                 let arr = res.map((elem:any,index:number)=>{
                    return this.getVoices(elem)
                 });
                 let result = Poll.map((elem:any,index:number)=>{
                     return {
                         id:elem.dataValues.id,
                         description:elem.dataValues.description,
                         count:arr[index]
                     }
                 });
                 response.send(result)
             })
        }
        else {
            Poll = await db.Poll.findAll({
                where:{
                    draft:false
                }
            });
            Fields = await db.Field.findAll({
                include:[{
                    model:db.Poll,
                    where: {draft: false}
                }]
            });
            let arr = this.getVoices(Fields);
            let result = Poll.map(async (elem:any,index:number)=>{
                let view = await db.PrivateView.findOne({
                    where:{
                        pollId:elem.dataValues.id
                    }
                });
                if(!view){
                    return {
                        id:elem.dataValues.id,
                        description:elem.dataValues.description,
                        count:arr[index]
                    }
                }
            });
            Promise.all(result).then((result:any)=>{
                let body = result.filter((elem:any)=>{
                    return !!elem
                });
                response.send(body)
            });
        }

    }

    public async create(request:Request,response: Response,id?:string){
        if(id){
            await db.Poll.destroy({
                where: {
                    id: id
                }
            });
            let directory = __dirname + `/../PollsFiles/${id}`;
            rimraf(directory, function () { console.log("done"); });
        }
        if(request.body.file)
            delete request.body.file;
        let body = request.body;
        let ids:number[];
        if(request.body.id){
            ids = JSON.parse(request.body.id);
        }
        let types = JSON.parse(request.body.types);
        body = this.correctObj(body);
        let fields = this.clearFields(body);
        let poll = await db.Poll.findOrCreate({
            where:{
                description:body.title
            },
            defaults:{
                description:body.title,
                draft:!!body.draft,
                userId:response.locals.user_id,
            }
        }).then(([poll,created]:[any,boolean])=>{
            if(created){
                let id = poll.dataValues.id;
                CategoriesController.createPollCategory(types,id);
                if(ids){
                    ids.forEach((elem:number)=>{
                        db.PrivateView.create({
                            pollId:id,
                            userId:elem
                        })
                    });
                }
                response.json({
                    id:id
                });
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
                    response.sendStatus(500);
                })
        })
    }

    public async getPoll(request:Request,response:Response){
        let types = await db.PollCategory.findAll({
            where:{
                pollId:request.params.id
            },
            include:db.Category
        });
        let PollTypes = types.map((elem:any)=>{
            return {
                type:elem.dataValues.Category.dataValues.type
            }
        });
        let Fields = await db.Field.findAll({
            where:{
                pollId:request.params.id
            },
            include:[
                {
                    model:db.Poll,
                    include:db.User
                }
            ]
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
                images:arr,
                draft:Fields[0].dataValues.Poll.dataValues.draft,
                name:Fields[0].dataValues.Poll.dataValues.User.initials,
                categories:PollTypes
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
        });
        let votes = await db.Votes.create({
            userId:response.locals.user_id,
            pollId:request.params.id
        });
        response.sendStatus(200);
    }

    public async publish(request:Request,response:Response){
        db.Poll.findOne({
            where:{
                id:request.params.id
            }
        }).then((poll:any)=>{
            poll.update({
                draft:false
            }).then(()=>{
                response.sendStatus(200);
            })
        })
    }
    public async preventVote(request:Request,response:Response){
        let votes = await db.Votes.findOne({
            where:{
                userId:response.locals.user_id,
                pollId:request.params.id
            }
        });
        votes ? response.send({
            vote:true
        }) : response.send({
            vote:false
        })
    }
    public async private(request:Request,response:Response){
        let privateView = await db.PrivateView.findAll({
            where:{
                pollId:request.params.id
            }
        });

        if(privateView.length){
            let flag = false;
            privateView.forEach((elem:any)=>{
               if(response.locals.user_id === elem.dataValues.userId){
                   flag=true
               }
            });
            if(flag)
                response.send('private_ok');
            else
                response.send('private')
        }
        else
            response.send('ok')
    }

}
module.exports = new PollsController();