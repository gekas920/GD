import {Snack as SnackComponent} from "./Snack";
import {connect} from "react-redux";


export interface SnackProps {
    showSnack:boolean,
    HideSnack:()=>void
}

const mapStateToProps = (state) => state.snackReducer;
const mapDispatchToProps = (dispatch)=> ({
    HideSnack:()=>{
        dispatch({
            type:'HIDE_SNACK',
        })
    }
});


const Snack = connect<SnackProps>(mapStateToProps,mapDispatchToProps)(SnackComponent);

export {
    Snack
}
