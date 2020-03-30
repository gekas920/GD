import express from 'express'
const token = require('./Tokens');
const db = require('../models');



async function checkAccessToken(req:express.Request,res:express.Response,next:express.NextFunction) {
    const accessToken:string | undefined = req.headers.authorization;
    try {
        token.verifyToken(accessToken);
        next()
    }
    catch (error) {
        res.status(409);
        res.send('invalid access token')
    }
}

async function checkRefreshToken(req:express.Request,res:express.Response,next:express.NextFunction) {
    const refreshToken:string | undefined = req.headers.authorization;
    try {
        let body = token.verifyToken(refreshToken);
        console.log(body.data);
        console.log(req.headers["user-agent"]);
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