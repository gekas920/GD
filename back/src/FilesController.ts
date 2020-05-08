import {Request, Response} from "express";
const md5 = require('md5');
const db = require('../models');
const fs = require('fs');
const path = require('path');

class Files {
    public uploadFile(request:Request,response:Response){
        // @ts-ignore
        const arr = Object.values(request.files);
        try {
            arr.forEach((file: any)=>{
                let extension:string | undefined = file.name.split('.').pop();
                file.mv(__dirname + `/../UsersFiles/${request.params.id}/${md5(file.name)}.${extension}`)
            })
        }
        catch (error) {
            response.status(500);
            response.send('Failed')
        }
        response.send('ok')
    }

    public sendFiles(request:Request,response:Response){
       // '1a6edd73b1c0c541c05fd10130f222f3.pdf'
        //fs.readdirSync(__dirname +  `/../UsersFiles/${response.locals.user_id}`)
       let data = fs.readFileSync(__dirname +  `/../UsersFiles/${response.locals.user_id}/1a6edd73b1c0c541c05fd10130f222f3.pdf`,{
           encoding:'utf8'
       });
       response.send(Buffer.from(data,'base64'))
    }
}


module.exports = new Files();