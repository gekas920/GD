import {EditPoll as EditPollComponent} from "./EditPoll";
import {connect} from "react-redux";


export interface PropsEditPoll {
    id:number | string,
    admin:boolean,
    SetClicked:(state:boolean)=>void,
}

const mapDispatchToProps = (dispatch)=> ({
    SetPoll:(payload)=>{
        dispatch({
            type:'SET_POLL',
            payload:payload
        })
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
    }
});


const mapStateToProps = (state) =>{
    return {
        admin:state.setAdmin.admin
    }
};

const EditPoll = connect(mapStateToProps,mapDispatchToProps)(EditPollComponent);
export {
    EditPoll
}