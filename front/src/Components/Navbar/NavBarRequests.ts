import Requests from "../../Requests";


export const SetUserAdmin = (url:string) => async dispatch=>{
    let Result = await Requests.get(url);
    if(Result.data)
        dispatch({
            type:'SET_ADMIN'
        })
};