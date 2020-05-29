import {connect} from "react-redux";
import {NavBar as NavBarComponent} from "./Navbar";
import {SetUserAdmin} from "./NavBarRequests";


const mapDispatchToProps = (dispatch)=> ({
    SetAdmin:(url:string)=>{
        dispatch(SetUserAdmin(url))
    }
});

export interface NavBarProps {
    SetAdmin:(url:string)=>void
}


const NavBar = connect(()=>{return {}},mapDispatchToProps)(NavBarComponent);
export {
    NavBar
}