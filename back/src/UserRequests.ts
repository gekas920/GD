import express from 'express';
const web = require('./App');
const token = require('./Tokens');
const Auth = require('./LoginController');

web.app.post('/register',(req:express.Request,res:express.Response)=>{
    Auth.CreateUser(req.body.login,req.body.password,req.body.name,req.body.email,res);
});

