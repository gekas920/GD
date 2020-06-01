import {Request, Response} from "express";
const db = require('../models');


class CategoriesController {
    public async get(request: Request, response: Response){
        let Categories = await db.Category.findAll({
            attributes:['type']
        });
        if(Categories)
            Categories = Categories.map((elem:any)=>{
                return elem.dataValues
            });
        response.send(Categories);
    }

    public async createPollCategory(categoryArr:string[],pollId:string|number){
        let ids = categoryArr.map(async (elem)=>{
            let type = await db.Category.findOne({
                where:{
                    type:elem
                }
            });
            return type.dataValues.id
        });
        Promise.all(ids).then(res=>{
            res.forEach((elem:number)=>{
                db.PollCategory.create({
                    pollId:pollId,
                    categoryId:elem
                })
            })
        })
    }
}

module.exports = new CategoriesController();