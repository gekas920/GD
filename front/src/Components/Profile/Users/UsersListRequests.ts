import Requests from "../../../Requests";


export const GetUsers =  (url) => async dispatch=>{
    let Result = await Requests.get(url);
    dispatch({
        type:'ADD_USERS',
        payload:Result.data
    })
};