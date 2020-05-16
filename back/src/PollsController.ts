import {Request, Response} from "express";
const db = require('../models');

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
}
module.exports = new PollsController();