const jwt = require('jsonwebtoken');


class Tokens{
    private secret:string = 'Some_secret_string';
    public genAccessToken(id:string,isAdmin:boolean):string{
        return jwt.sign({
            id,
            isAdmin
        }, this.secret, {expiresIn: '5m'})
    }

    public genRefreshToken(id: string, userAgent: string | undefined):string{
        return jwt.sign({
            id:id,
            userAgent
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
