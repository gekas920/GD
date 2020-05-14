const db = require('../models');
const hash = require('../config/bcrypt_conf');
import {Request, Response} from "express";
const token = require('./Tokens');
const fs = require('fs');


class Auth{
    private static checkPass(password:string, hashPass:string){
        return hash.compareSync(password,hashPass);
    }
    public async CreateUser(request:Request, response: Response) {
        const login:string = request.body.login;
        const password:string = request.body.password;
        const email:string = request.body.email;
        const date:Date = request.body.date;
        const about:string = request.body.about;
        const initials:string = request.body.initials;
        await db.User.findOrCreate({
            where: {
                login
            },
            defaults: {
                login,
                password: hash.hashSync(password, hash.salt),
                email,
                date:date,
                about:about,
                initials:initials,
                admin:false,
                deleted:false
            }
        })
            .then(([user, created]: [any, boolean]) => {
                if (created) {
                    fs.mkdirSync(__dirname + `/../UsersFiles/${user.dataValues.id}`);
                    response.send({
                        id:user.dataValues.id,
                        accessToken: token.genAccessToken(user.dataValues.id,false),
                        refreshToken:token.genRefreshToken(user.dataValues.id,request.headers["user-agent"]),
                        admin:user.dataValues.admin
                    });
                } else {
                    response.send({status: 'already exist'})
                }
            })
            .catch((error: Error) => {
                console.log(error)
            });
        // db.User.destroy({
        //     where: {},
        //     truncate: true
        // })

    }
    public async LogUser(request:Request, response: Response) {
        const login:string = request.body.login;
        const password:string = request.body.password;
        console.log(hash.hashSync('admin', hash.salt));
        await db.User.findOne({
            where: {
                login
            }
        })
            .then(async (user: any) => {
                if (!user || user.dataValues.deleted) {
                    response.send({status: 'not found'});
                    return
                }
                if (!Auth.checkPass(password, user.dataValues.password)) {
                    response.send({status: 'invalid password'});
                    return;
                }
                response.send({
                    accessToken: token.genAccessToken(user.dataValues.id,user.dataValues.admin),
                    refreshToken:token.genRefreshToken(user.dataValues.id,request.headers["user-agent"]),
                    admin:user.dataValues.admin
                })

            })
    }
    public newTokens(request:Request,response:Response){
        const body = token.verifyToken(request.headers.authorization);
        response.send({
            accessToken: token.genAccessToken(body.id,body.isAdmin),
            refreshToken:token.genRefreshToken(body.id,body.data)
        })
    }

}



module.exports = new Auth();