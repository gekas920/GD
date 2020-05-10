const web = require('./App');
import express from 'express';
const Auth = require('./LoginController');
const drive:string = '/drive';
const middleware = require('./Middleware');
const Files = require('./FilesController');
const ProfileController = require('./ProfileController');
const UserController = require('./UserController');

web.app.use('/drive',(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    middleware.checkAccessToken(req,res,next)
});

web.app.use('/drive-check',(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    middleware.checkRefreshToken(req,res,next);
});

web.app.post('/register',(req:express.Request,res:express.Response)=>{
    Auth.CreateUser(req,res);
});

web.app.post('/avatar/:id',(req:express.Request,res:express.Response)=>{
   Files.uploadFile(req,res)
});

web.app.post('/login',(req:express.Request,res:express.Response)=>{
   Auth.LogUser(req,res)
});

web.app.get('/drive-check',(req:express.Request,res:express.Response)=>{
    Auth.newTokens(req,res);
});

web.app.get(drive+'/profile',(req:express.Request,res:express.Response)=>{
   ProfileController.get(req,res);
});

web.app.put(drive+'/profile',(req:express.Request,res:express.Response)=>{
    ProfileController.update(req,res)
});

web.app.get(drive+'/users',(req:express.Request,res:express.Response)=>{
    UserController.showAll(req,res)
});