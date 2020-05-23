import {Request, Response} from "express";
const md5 = require('md5');

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

    public uploadPollFile(request:Request,response:Response,pollId:string){
        // @ts-ignore
        const arr = Object.values(request.files);
        arr.forEach((file: any)=>{
            let extension:string | undefined = file.name.split('.').pop();
            file.mv(__dirname + `/../PollsFiles/${pollId}/${md5(file.name)}.${extension}`)
        });
    }
}


module.exports = new Files();