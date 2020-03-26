const jwt = require('jsonwebtoken');


class Tokens{
    private secret:string = 'Some_secret_string';
    public genAccessToken(id:string,token:string):string{
        return jwt.sign({
            id:id,
            jti:token
        }, this.secret, {expiresIn: '5m'})
    }

    public genRefreshToken(name:string):string{
        return jwt.sign({
            data:name
        }, this.secret, {expiresIn: '60d'})
    }

    public verifyToken(token:string){
        return jwt.verify(token,this.secret);
    }

}


let Token = new Tokens();

module.exports = Token;