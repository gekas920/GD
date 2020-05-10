import express from 'express'
const token = require('./Tokens');
const db = require('../models');



async function checkAccessToken(req:express.Request,res:express.Response,next:express.NextFunction) {
    const accessToken:string | undefined = req.headers.authorization;
    try {
        let body = token.verifyToken(accessToken);
        if(body){
            res.locals.user_id = body.id;
            next()
        }
        else{
            res.status(401);
            res.send('Unauthorized');
        }
    }
    catch (error) {
        let body = token.decodeToken(accessToken);
        if(body){
            res.locals.user_id = body.id;
            res.status(203);
            next()
        }
        else {
            res.status(401);
            res.send('Unauthorized')
        }

    }
}

async function checkRefreshToken(req:express.Request,res:express.Response,next:express.NextFunction) {
    const refreshToken:string | undefined = req.headers.authorization;
    try {
        let body = token.verifyToken(refreshToken);
        res.locals.user_id = body.id;
        next()
    }
    catch (error) {
        res.status(401);
        res.send('Unauthorized')
    }
}

module.exports.checkAccessToken = checkAccessToken;
module.exports.checkRefreshToken = checkRefreshToken;