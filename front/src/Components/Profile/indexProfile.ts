import {AppState} from "../../Store/Types";

export interface userData {
    email:string,
    date:Date,
    initials:string,
    about:string
}

export const mapDispatchToProps = (dispatch)=> ({
    ShowSnack:()=>{
        dispatch({
            type:'SHOW_SNACK',
        })
    }
});


export const mapStateToProps = (state : AppState) =>{
    return state
};