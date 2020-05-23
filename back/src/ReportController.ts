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
}


module.exports = new ReportController();