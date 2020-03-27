const db = require('../models');
const hash = require('../config/bcrypt_conf');
import {Response} from "express";
const token = require('./Tokens');

class Auth{
    private static checkPass(password:string, hashPass:string){
        return hash.compareSync(password,hashPass);
    }
    public async CreateUser(login: string, password: string, name: string, email: string, response: Response) {
        const date: Date = new Date(Date.now());
        await db.User.findOrCreate({
            where: {
                login
            },
            defaults: {
                login,
                password: hash.hashSync(password, hash.salt),
                email,
                name,
                refreshToken: token.genRefreshToken(name),
                expiredIn: new Date(date.setMonth(date.getMonth() + 2))
            }
        })
            .then(([user, created]: [any, boolean]) => {
                if (created) {
                    response.send({token: token.genAccessToken(user.dataValues.id, user.dataValues.refreshToken)});
                } else {
                    response.status(409);
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
    public async LogUser(login: string, password: string, response: Response) {
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
                const date: Date = new Date(Date.now());
                const refreshToken:string = token.genRefreshToken(user.dataValues.name);
                await user.update({
                    refreshToken,
                    expiredIn: new Date(date.setMonth(date.getMonth() + 2))
                });
                response.send({
                    accessToken:token.genAccessToken(user.dataValues.id,refreshToken)
                })

            })
    }
}


module.exports = new Auth();