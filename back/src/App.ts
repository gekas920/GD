import express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app: express.Application = express();
const db = require('../models');
const fileUpload = require('express-fileupload');

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended:false,limit: '50mb'}));
app.use(fileUpload());

db.sequelize.sync().then(()=>{
    console.log('Connected')
})
    .catch((err:Error)=>{
        console.log(err);
    });


app.listen(3000, () => {
});

module.exports.app = app;