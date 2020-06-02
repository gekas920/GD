import {Request, Response} from "express";
const db = require('../models');


class CategoriesController {
    public async get(request: Request, response: Response){
        let Categories = await db.Category.findAll({
            attributes:['id','type']
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

    public async create(request: Request, response: Response){
        await db.Category.findOrCreate({
            where:{
                type:request.body.type
            },
            defaults:{
                type:request.body.type
            }
        }).then(([category,created]:[any,boolean])=>{
            if(created)
                response.send({id:category.dataValues.id});
            else
                response.send('Exist')
        })
    }
    public async delete(request: Request, response: Response){
        await db.Category.findOne({
            where:{
                id:request.params.id
            }
        })
            .then((category:any)=>{
                category.destroy();
                response.sendStatus(200);
            })
            .catch(()=>response.sendStatus(500))
    }
}

module.exports = new CategoriesController();