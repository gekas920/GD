import {EditPoll as EditPollComponent} from "./EditPoll";
import {connect} from "react-redux";
import {EditPollInfo} from "./EditPollRequests";


export interface PropsEditPoll {
    id:number | string,
    admin:boolean,
    SetClicked:(state:boolean)=>void,
    exist:boolean,
    HideEx:()=>void,
    EditPollReq:(url,body,option)=>void
}

const mapDispatchToProps = (dispatch)=> ({
    SetPoll:(payload)=>{
        dispatch({
            type:'SET_POLL',
            payload:payload
        })
    },
    EditPollReq:(url,body,options)=>{
        dispatch(EditPollInfo(url,body,options))
    },
    ShowSnack:()=>{
        dispatch({
            type:'SHOW_SNACK'
        })
    },
    SetClicked:(payload)=>{
        dispatch({
            type:'SET_CLICK',
            payload:payload
        })
    },
    HideEx:()=>{
        dispatch({
            type:'HIDE_EX'
        })
    }
});


const mapStateToProps = (state) =>{
    return {
        admin:state.setAdmin.admin,
        exist:state.setEx.existError
    }
};

const EditPoll = connect(mapStateToProps,mapDispatchToProps)(EditPollComponent);
export {
    EditPoll
}