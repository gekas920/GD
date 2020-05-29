import {AddPoll as AddPollComponent} from "./AddPoll";
import {connect} from "react-redux";
import {AddPollReq} from "./AddPollRequests";


export interface PropsAddPoll {
    ShowSnack:()=>void,
    AddPollReq:(url,formData,options,draft)=>void,
    HideEx:()=>void,
    ids:number[],
    admin:boolean,
    exist:boolean
}

const mapDispatchToProps = (dispatch)=> ({
    ShowSnack:()=>{
        dispatch({
            type:'SHOW_SNACK'
        })
    },
    AddPollReq:(url:string,formData,options,draft)=>{
        dispatch(AddPollReq(url,formData,options,draft))
    },
    HideEx:()=>{
        dispatch({
            type:'HIDE_EX'
        })
    }
});

const mapStateToProps = (state) =>{
    return{
        admin:state.setAdmin.admin,
        ids:state.setId.ids,
        exist:state.setEx.existError
    }
};

const AddPoll = connect(mapStateToProps,mapDispatchToProps)(AddPollComponent);

export {
    AddPoll
}