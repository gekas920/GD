import Requests from "../../Requests";


export const GetUser = async (url)=>{
    let User = await Requests.get(url);
    return User.data
};

export const UpdateUserInfo = (url,body?) => async dispatch => {
    let Update = await Requests.update(url, body);
    if(Update.data){
        dispatch({
            type:'SHOW_SNACK'
        });
    }
    return Update.data
};

export const DeleteUserInfo = (url) => async dispatch =>{
    let Delete = await Requests.delete(url);
    if(Delete.data){
        dispatch({
            type:'SHOW_SNACK'
        });
    }
};