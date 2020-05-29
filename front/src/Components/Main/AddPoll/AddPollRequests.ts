import Requests from "../../../Requests";


export const AddPollReq = (url:string,formData,options,draft) => async dispatch =>{
    let Create;
    Create = await Requests.create(url,formData,options);
    if(Create){
        if(Create.data && draft){
            dispatch({
                type:'SHOW_SNACK'
            });
        }
        if(Create.data && !draft){
            window.location.href = `/main/polls/${Create.data.id}`;
        }
    }
    else {
        dispatch({
            type:'SET_EX'
        })
    }
};