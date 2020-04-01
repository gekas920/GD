import express from 'express'
const token = require('./Tokens');
const db = require('../models');



async function checkAccessToken(req:express.Request,res:express.Response,next:express.NextFunction) {
    const accessToken:string | undefined = req.headers.authorization;
    try {
        let body = token.verifyToken(accessToken);
        res.locals.user_id = body.id;
        next()
    }
    catch (error) {
        console.log(error);
        let body = token.decodeToken(accessToken);
        res.locals.user_id = body.id;
        res.status(409);
        next()
    }
}

async function checkRefreshToken(req:express.Request,res:express.Response,next:express.NextFunction) {
    const refreshToken:string | undefined = req.headers.authorization;
    try {
        let body = token.verifyToken(refreshToken);
        console.log(body.data);
        console.log(req.headers["user-agent"]);
        res.locals.user_id = body.id;
        if(body.data !== req.headers["user-agent"]){
            res.status(401);
            res.send('Unauthorized')
        }
        next()
    }
    catch (error) {
        res.status(401);
        res.send('Unauthorized')
    }
}

module.exports.checkAccessToken = checkAccessToken;
module.exports.checkRefreshToken = checkRefreshToken;