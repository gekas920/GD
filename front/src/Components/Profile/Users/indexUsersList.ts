import {Users as UsersComponent} from './UsersList'
import {connect} from "react-redux";
import {GetUsers} from "./UsersListRequests";

const mapDispatchToProps = (dispatch)=> ({
    SendData : (payload)=>{
        dispatch(GetUsers(payload))
    }
});

const mapStateToProps = state=>{
    return {
        usersList:state.setUsers.usersList
    }
};

export interface UsersListProps {
    SendData : (url:string)=>void,
    usersList:[]
}

const Users = connect(mapStateToProps,mapDispatchToProps)(UsersComponent);

export {
    Users
}