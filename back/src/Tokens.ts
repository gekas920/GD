const jwt = require('jsonwebtoken');


class Tokens{
    private secret:string = 'Some_secret_string';
    public genAccessToken(id:string):string{
        return jwt.sign({
            id,
        }, this.secret, {expiresIn: '5m'})
    }

    public genRefreshToken(id:string,userAgent:string):string{
        return jwt.sign({
            id:id,
            data:userAgent
        }, this.secret,{expiresIn:'60d'})
    }

    public verifyToken(token: string | undefined){
        return jwt.verify(token,this.secret);
    }

    public decodeToken(token:string | undefined){
        return jwt.decode(token);
    }

}
let Token = new Tokens();
module.exports = Token;
