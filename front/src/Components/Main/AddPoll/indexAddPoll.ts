import {AddPoll as AddPollComponent} from "./AddPoll";
import {connect} from "react-redux";


export interface PropsAddPoll {
    ShowSnack:()=>void,
    ids:number[],
    admin:boolean
}

const mapDispatchToProps = (dispatch)=> ({
    ShowSnack:()=>{
        dispatch({
            type:'SHOW_SNACK'
        })
    }
});

const mapStateToProps = (state) =>{
    return{
        admin:state.setAdmin.admin,
        ids:state.setId.ids
    }
};

const AddPoll = connect(mapStateToProps,mapDispatchToProps)(AddPollComponent);

export {
    AddPoll
}