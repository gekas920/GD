const db = require('../models');
const hash = require('../config/bcrypt_conf');
import {Request, Response} from "express";
const token = require('./Tokens');
const fs = require('fs');

class ProfileController{
    public async get(request: Request, response: Response, id?: string){
        db.User.findOne({
            where:{
                id: id || response.locals.user_id
            }
        })
            .then((result:any)=>{
                let fileName = '';
                fs.readdir(__dirname + `/../UsersFiles/${result.dataValues.id}`, (err:Error, files:[]) => {
                    files.forEach((file) => {
                        fileName = file;
                    });
                    response.send({
                        email:result.dataValues.email,
                        initials:result.dataValues.initials,
                        date:result.dataValues.date,
                        about:result.dataValues.about,
                        img:`http://localhost:3000/files/${result.dataValues.id}/${fileName}`
                    }).end()
                });
            });
    }
    public async update(request:Request,response:Response,id?: string){
        db.User.findOne({
            where:{
                id:id || response.locals.user_id
            }
        })
            .then((result:any)=>{
                result.update({
                    email:request.body.email,
                    initials:request.body.initials,
                    date:request.body.date,
                    about:request.body.about,
                }).then((result:any)=>{
                    response.send('Ok')
                })
                    .catch(()=>{
                        response.send(500);
                    })
            })
    }

    public async delete(request:Request,response:Response,id: string){
        db.User.findOne({
            where:{
                id:id
            }
        })
            .then((result:any)=>{
                result.destroy().then((result:any)=>{
                    response.send('Ok')
                })
                    .catch(()=>{
                        response.send(500);
                    })
            })
    }

    public async deleteTemporarily(request:Request,response:Response,id: string){
        db.User.findOne({
            where:{
                id:id
            }
        })
            .then((result:any)=>{
                result.update({
                    deleted:true
                }).then((result:any)=>{
                    response.send('Ok')
                })
                    .catch(()=>{
                        response.send(500);
                    })
            })
    }

    public async back(request:Request,response:Response,id: string){
        db.User.findOne({
            where:{
                id:id
            }
        })
            .then((result:any)=>{
                result.update({
                    deleted:false
                }).then((result:any)=>{
                    response.send('Ok')
                })
                    .catch(()=>{
                        response.send(500);
                    })
            })
    }
}

module.exports = new ProfileController();