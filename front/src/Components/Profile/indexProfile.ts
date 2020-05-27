import {Profile as ProfileComponent} from "./Profile";
import {connect} from "react-redux";

export interface userData {
    email:string,
    date:Date,
    initials:string,
    about:string
}

export interface ProfileProps {
    ShowSnack:()=>void,
    admin:boolean,
    url:string
}

const mapDispatchToProps = (dispatch)=> ({
    ShowSnack:()=>{
        dispatch({
            type:'SHOW_SNACK',
        })
    }
});

const mapStateToProps = (state) =>{
    return {
        admin:state.setAdmin.admin
    }
};

const Profile = connect(mapStateToProps,mapDispatchToProps)(ProfileComponent);

export {
    Profile
}