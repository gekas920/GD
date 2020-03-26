const db = require('../models');
const hash = require('../config/bcrypt_conf');
import {Response} from "express";
const token = require('./Tokens');

class Auth{
    public CreateUser(login:string,password:string,name:string,email:string,response:Response){
        let date:Date = new Date(Date.now());
        db.User.findOrCreate({
            where:{
                login:login
            },
            defaults:{
                login:login,
                password:hash.hashSync(password,hash.salt),
                email:email,
                name:name,
                refreshToken: token.genRefreshToken(name),
                expiredIn:new Date(date.setMonth(date.getMonth()+2))
            }
        })
            .then(([user,created]:[any,boolean])=>{
                if(created){
                    response.send({token:token.genAccessToken(user.dataValues.id,user.dataValues.refreshToken)});
                }
                else {
                    response.status(409);
                    response.send({status:'already exist'})
                }
            })
            .catch((error:Error) => {
                console.log(error)
            });
        // db.User.destroy({
        //     where: {},
        //     truncate: true
        // })
    }
}


module.exports = new Auth();