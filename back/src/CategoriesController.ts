import {Request, Response} from "express";
const db = require('../models');
const PollsController = require('./PollsController');

class CategoriesController {
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

    public async getPolls(request: Request, response: Response){
        let Poll = await db.PollCategory.findAll({
            where:{
                categoryId:request.params.id
            },
            include:[
                {
                    model:db.Poll,
                    where:{
                        draft:false
                    }
                },
                {
                    model:db.Category
                }
            ]
        });
        Poll = Poll.map((elem:any)=>{
            return elem.dataValues.Poll.dataValues
        });

        let ids = Poll.map((elem:any)=>{
            return elem.id
        });
        if(!ids.length)
            ids = -1;

        let Fields = await db.Field.findAll({
            include:[{
                model:db.Poll,
                where: {
                    id:[ids],
                    draft: false
                }
            }]
        });
        let arr:number[] = [];
        if(Fields.length){
            arr = this.getVoices(Fields);
        }
        let result = Poll.map(async (elem:any,index:number)=>{
                return {
                    id:elem.id,
                    description:elem.description,
                    count:arr[index]
                }
        });
        Promise.all(result).then((result:any)=>{
            let body = result.filter((elem:any)=>{
                return !!elem
            });
            response.send(body);
    })}
}

module.exports = new CategoriesController();