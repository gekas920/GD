import {CheckboxList as CheckboxListComponent} from "./SetPrivateDialog";
import {connect} from "react-redux";



export interface PropsCheckBoxList {
    SetID:(arr:string[])=>void,
    ShowSnack:()=>void
}



export const mapDispatchToProps = (dispatch)=> ({
    SetID:(payload)=>{
        dispatch({
            type:'SET_ID',
            payload:payload
        })
    },
    ShowSnack:()=>{
        dispatch({
            type:'SHOW_SNACK'
        })
    }
});

const CheckBoxList = connect(()=>{return {}},mapDispatchToProps)(CheckboxListComponent);


export {
    CheckBoxList
}