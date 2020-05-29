import Requests from "../../Requests";


export const Login = async (url, body) => {
    let LoginRes = await Requests.logCreate(url, body);
    if(LoginRes.data.accessToken){
        Requests.setAccessToken(LoginRes.data.accessToken);
        Requests.setRefreshToken(LoginRes.data.refreshToken);
        window.location.href = '/main/polls';
        return 'next'
    }
    if(LoginRes.data.status === 'not found'){
        return 'incorrect data'
    }
    if(LoginRes.data.status === 'invalid password'){
        return 'invalid password'
    }
};

export const Register = async (url,body,formData)=>{
    let RegisterRes = await Requests.logCreate('/register',body);
    if(RegisterRes.data.accessToken){
        Requests.setAccessToken(RegisterRes.data.accessToken);
        Requests.setRefreshToken(RegisterRes.data.refreshToken);
        await Requests.uploadAvatar(`/avatar/${RegisterRes.data.id}`, formData);
        window.location.href = '/main/polls';
    }
    if(RegisterRes.data.status === 'already exist'){
        return true
    }
};