import {Profile as ProfileComponent} from "./Profile";
import {connect} from "react-redux";
import {DeleteUserInfo, UpdateUserInfo} from "./ProfileRequests";

export interface userData {
    email:string,
    date:Date,
    initials:string,
    about:string
}

export interface ProfileProps {
    ShowSnack:()=>void,
    UpdateInfo:(url:string,body?)=>void,
    DeleteUser:(url:string)=>void,
    admin:boolean,
    url:string
}

const mapDispatchToProps = (dispatch)=> ({
    ShowSnack:()=>{
        dispatch({
            type:'SHOW_SNACK',
        })
    },
    UpdateInfo:(url,body)=>{
        dispatch(UpdateUserInfo(url,body))
    },
    DeleteUser:(url)=>{
        dispatch(DeleteUserInfo(url))
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