import express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app: express.Application = express();
const db = require('../models');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
db.sequelize.sync().then(()=>{
    console.log('Connected')
})
    .catch((err:Error)=>{
        console.log(err);
    });


app.listen(3000, () => {
});


module.exports.app = app;