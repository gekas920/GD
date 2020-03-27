import express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app: express.Application = express();
const db = require('../models');
const middleware = require('./Middleware');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/drive',(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    middleware(req,res,next)
});

db.sequelize.sync().then(()=>{
    console.log('Connected')
})
    .catch((err:Error)=>{
        console.log(err);
    });


app.listen(3000, () => {
});

module.exports.app = app;