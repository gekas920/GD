import {connect} from "react-redux";
import {NavBar as NavBarComponent} from "./Navbar";


const mapDispatchToProps = (dispatch)=> ({
    SetAdmin:()=>{
        dispatch({
            type:'SET_ADMIN',
        })
    }
});

export interface NavBarProps {
    SetAdmin:()=>void
}


const NavBar = connect(()=>{return {}},mapDispatchToProps)(NavBarComponent);
export {
    NavBar
}