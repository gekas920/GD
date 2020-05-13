import {AppState} from "../../Store/Types";

export const mapDispatchToProps = (dispatch)=> ({
    SetAdmin:()=>{
        dispatch({
            type:'SET_ADMIN',
        })
    }
});


export const mapStateToProps = (state : AppState) =>{
    return state
};