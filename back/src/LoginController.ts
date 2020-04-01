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
        const name: string = request.body.name;
        const email:string = request.body.email;
        await db.User.findOrCreate({
            where: {
                login
            },
            defaults: {
                login,
                password: hash.hashSync(password, hash.salt),
                email,
                name
            }
        })
            .then(([user, created]: [any, boolean]) => {
                if (created) {
                    fs.mkdirSync(__dirname + `/../UsersFiles/${user.dataValues.id}`);
                    response.send({
                        accessToken: token.genAccessToken(user.dataValues.id),
                        refreshToken:token.genRefreshToken(user.dataValues.id,request.headers["user-agent"])
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
        await db.User.findOne({
            where: {
                login
            }
        })
            .then(async (user: any) => {
                if (!user) {
                    response.send({status: 'not found'});
                    return
                }
                if (!Auth.checkPass(password, user.dataValues.password)) {
                    response.send({status: 'invalid password'});
                    return;
                }
                response.send({
                    accessToken: token.genAccessToken(user.dataValues.id),
                    refreshToken:token.genRefreshToken(user.dataValues.id,request.headers["user-agent"])
                })

            })
    }
    public newTokens(request:Request,response:Response){
        const body = token.verifyToken(request.headers.authorization);
        response.send({
            accessToken: token.genAccessToken(body.id),
            refreshToken:token.genRefreshToken(body.id,body.data)
        })
    }

}



module.exports = new Auth();