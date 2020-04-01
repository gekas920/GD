import {Request, Response} from "express";
const md5 = require('md5');
const db = require('../models');

class Files {
    public uploadFile(request:Request,response:Response){
        // @ts-ignore
        const arr = Object.values(request.files);
        try {
            arr.forEach((file: any)=>{
                let extension:string | undefined = file.name.split('.').pop();
                db.File.build({
                    name:file.name,
                    hash:md5(file.name),
                    folder:null
                });
                file.mv(__dirname + `/../UsersFiles/${response.locals.user_id}/${md5(file.name)}.${extension}`)
            })
        }
        catch (error) {
            response.status(500);
            response.send('Failed')
        }
        response.send('ok')
    }
}


module.exports = new Files();