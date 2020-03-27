const jwt = require('jsonwebtoken');


class Tokens{
    private secret:string = 'Some_secret_string';
    public genAccessToken(id:string,token:string):string{
        return jwt.sign({
            id,
            jti:token
        }, this.secret, {expiresIn: '5m'})
    }

    public genRefreshToken(name:string):string{
        return jwt.sign({
            data:name
        }, this.secret)
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
