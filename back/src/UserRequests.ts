const web = require('./App');
import express from 'express';
const token = require('./Tokens');
const Auth = require('./LoginController');
const drive:string = '/drive';
const middleware = require('./Middleware');



web.app.post('/register',(req:express.Request,res:express.Response)=>{
    Auth.CreateUser(req.body.login,req.body.password,req.body.name,req.body.email,res);
});

web.app.post('/login',(req:express.Request,res:express.Response)=>{
   Auth.LogUser(req.body.login,req.body.password,res)
});

web.app.get(drive + '/data',(req:express.Request,res:express.Response)=>{
    res.send('ok');
});
