
import {AppState} from "../../../../Store/Types";



export interface PropsCheckBoxList {
    setId:AppState
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
export const mapStateToProps = (state) =>{
    return {
        ids:state.setId.ids
    }
};

// const CheckBoxList = connect(mapStateToProps,mapDispatchToProps)(CheckboxListComponent);
//
//
// export {
//     CheckBoxList
// }