import {Request, Response} from "express";
const db = require('../models');
const Files = require('./FilesController');


class PollsController{
    private getVoices(arr:any[]){
        let id = arr[0].dataValues.pollId;
        let res: number[] = [];
        let countVoices = arr[0].dataValues.count;
        for (let i = 1; i < arr.length; i++){
            if(arr[i].dataValues.pollId <= id){
                countVoices+=arr[i].dataValues.count
            }
            else {
                res.push(countVoices);
                id = arr[i].dataValues.count;
            }
            if(i === arr.length - 1){
                res.push(countVoices);
            }
        }
        return res
    }

    private correctObj(obj:any){
        let lastValue = Object.keys(obj)[Object.keys(obj).length-1];
        delete obj[lastValue];
        return {...obj,correct:lastValue.split('')[0]}
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
        console.log(parseInt(body.correct));
        // await db.Poll.findOrCreate({
        //     where:{
        //         description:body.title
        //     },
        //     defaults:{
        //         description:body.title,
        //         draft:body.draft,
        //         userId:response.locals.user_id
        //     }
        // })
        // for (let key in body){
        //     if(key.length === 1){
        //         // @ts-ignore
        //         const arr = Object.values(request.files);
        //         arr.forEach((file:any)=>{
        //             Files.uploadPollFile(file,1)
        //         });
        //     }
        // }
    }
}
module.exports = new PollsController();