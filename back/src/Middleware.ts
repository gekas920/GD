import express from 'express'
const token = require('./Tokens');
const db = require('../models');


async function checkToken(req:express.Request,res:express.Response,next:express.NextFunction) {
    const accessToken:string | undefined = req.headers.authorization;
    console.log('wqeqwd');
    try {
        token.verifyToken(accessToken);
        next()
    }
    catch (error) {
        if (accessToken != null) {
            const tokenBody = token.decodeToken(accessToken);
            const user = await db.User.findByPk(tokenBody.id);
            console.log(user.dataValues)
        }
    }
}

module.exports = checkToken;