import {Request, Response} from "express";
const db = require('../models');


class ReportController {
    public async getReasons(request:Request,response:Response){
        await db.Reason.findAll({
            attributes:['type']
        })
            .then((reason:any)=>{
                response.send(reason);
            })
    }

    public async create(request:Request,response:Response){
        let userId = response.locals.user_id;
        let reason = await db.Reason.findOne({
            where:{
                type:request.body.type
            }
        });
        let reasonId = reason.dataValues.id;
        let report = await db.Report.create({
            description:request.body.description,
            reasonId:reasonId,
            pollId:request.body.pollId,
            userId:response.locals.user_id
        });
        if(report)
            response.send('ok');
        else
            response.sendStatus(500);
    }

    public async get(request:Request,response:Response){
        let reports = await db.Report.findAll({
            include:[db.Poll,db.Reason],
            attributes:['description','id']
        });
        let arr = reports.map((elem:any)=>{
            if(elem)
                return {
                   title:elem.dataValues.Poll.description,
                   type: elem.dataValues.Reason.dataValues.type,
                   id:elem.dataValues.id
                }
        });
        response.send(arr);
    }

    public async getReport(request:Request,response:Response){
        let report = await db.Report.findOne({
            where:{
                id:request.params.id
            },
            include:[db.Poll,db.User,db.Reason]
        });
        let body = {
            description:report.dataValues.description,
            type:report.dataValues.Reason.dataValues.type,
            pollId:report.dataValues.pollId,
            initials:report.dataValues.User.dataValues.initials
        };
        response.send(body)
    }

    public async delete(request:Request,response:Response){
        let report = await db.Report.findOne({
            where:{
                id:request.params.id
            }
        });
        report.destroy().then(()=>response.sendStatus(200))
            .catch(()=>response.sendStatus(500))
    }
}


module.exports = new ReportController();