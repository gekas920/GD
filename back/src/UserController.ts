const db = require('../models');
const hash = require('../config/bcrypt_conf');
const token = require('./Tokens');
const fs = require('fs');
import {Request, Response} from "express";


class UserController {
    public async showAll(request:Request,response:Response){
        db.User.findAll()
            .then((result:any[])=>{
                let arr = result.map(elem=>{
                    return {
                        id:elem.dataValues.id,
                        email:elem.dataValues.email,
                        initials:elem.dataValues.initials,
                        date:elem.dataValues.date,
                        about:elem.dataValues.about,
                        admin:elem.dataValues.admin,
                        deleted:elem.dataValues.deleted
                    }
                });
                response.send(arr)
            })
    }
}

module.exports = new UserController();