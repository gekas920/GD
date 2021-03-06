const web = require('./App');
import express from 'express';
const Auth = require('./LoginController');
const drive:string = '/drive';
const middleware = require('./Middleware');
const Files = require('./FilesController');
const ProfileController = require('./ProfileController');
const UserController = require('./UserController');
const PollsController = require('./PollsController');
const ReportController = require('./ReportController');
const CategoriesController = require('./CategoriesController');

web.app.use('/drive',(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    middleware.checkAccessToken(req,res,next)
});

web.app.use('/drive-check',(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    middleware.checkRefreshToken(req,res,next);
});

web.app.get(drive+'/admin',(req:express.Request,res:express.Response)=>{
    ProfileController.isAdmin(req,res)
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

web.app.get(drive+'/profile/:id',(req:express.Request,res:express.Response)=>{
    ProfileController.get(req,res,req.params.id);
});

web.app.put(drive+'/profile/:id',(req:express.Request,res:express.Response)=>{
    ProfileController.update(req,res,req.params.id)
});

web.app.delete(drive+'/profile/delete/:id',(req:express.Request,res:express.Response)=>{
    ProfileController.deleteTemporarily(req,res,req.params.id)
});

web.app.delete(drive+'/profile/forever/:id',(req:express.Request,res:express.Response)=>{
    ProfileController.delete(req,res,req.params.id)
});

web.app.put(drive+'/profile/back/:id',(req:express.Request,res:express.Response)=>{
    ProfileController.back(req,res,req.params.id)
});

web.app.get(drive+'/polls',(req:express.Request,res:express.Response)=>{
    PollsController.get(req,res);
});

web.app.get(drive+'/my',(req:express.Request,res:express.Response)=>{
    PollsController.get(req,res,res.locals.user_id);
});

web.app.post(drive+'/poll',(req:express.Request,res:express.Response)=>{
    PollsController.create(req,res)
});

web.app.delete(drive+'/poll/:id',(req:express.Request,res:express.Response)=>{
    PollsController.delete(req,res)
});

web.app.get(drive+'/poll/:id',(req:express.Request,res:express.Response)=>{
    PollsController.getPoll(req,res)
});

web.app.put(drive+'/poll/:id',(req:express.Request,res:express.Response)=>{
   PollsController.update(req,res)
});

web.app.put(drive+'/poll/update/:id',(req:express.Request,res:express.Response)=>{
    PollsController.create(req,res,req.params.id)
});


web.app.get(drive+'/poll/votes/:id',(req:express.Request,res:express.Response)=>{
   PollsController.preventVote(req,res)
});

web.app.get(drive+'/reasons',(req:express.Request,res:express.Response)=>{
    ReportController.getReasons(req,res)
});

web.app.post(drive+'/report',(req:express.Request,res:express.Response)=>{
   ReportController.create(req,res)
});

web.app.get(drive+'/report',(req:express.Request,res:express.Response)=>{
   ReportController.get(req,res)
});

web.app.get(drive+'/report/:id',(req:express.Request,res:express.Response)=>{
    ReportController.getReport(req,res)
});

web.app.delete(drive+'/report/:id',(req:express.Request,res:express.Response)=>{
   ReportController.delete(req,res)
});

web.app.get(drive+'/users/add',(req:express.Request,res:express.Response)=>{
    ProfileController.getUsers(req,res)
});

web.app.get(drive+'/poll/private/:id',(req:express.Request,res:express.Response)=>{
    PollsController.private(req,res)
});

web.app.get(drive+'/categories',(req:express.Request,res:express.Response)=>{
    CategoriesController.get(req,res)
});

web.app.put(drive+'/poll/publish/:id',(req:express.Request,res:express.Response)=>{
    PollsController.publish(req,res)
});

web.app.post(drive+'/category',(req:express.Request,res:express.Response)=>{
    CategoriesController.create(req,res)
});
web.app.delete(drive+'/category/:id',(req:express.Request,res:express.Response)=>{
    CategoriesController.delete(req,res)
});

web.app.get(drive+'/category/:id',(req:express.Request,res:express.Response)=>{
    CategoriesController.getPolls(req,res)
})