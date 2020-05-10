import {AppState} from "../../Store/Types";

export const mapStateToProps = (state : AppState) => state;
export const mapDispatchToProps = (dispatch)=> ({
    HideSnack:()=>{
        dispatch({
            type:'HIDE_SNACK',
        })
    }
});