import {Polls as PollsComponent} from "./Poll";
import {connect} from "react-redux";


export interface PropsPoll {
    show:string,
    admin:boolean,
    clicked:number,
    SetClicked:(state:boolean)=>void
}


const mapStateToProps = (state) =>{
   return{
       admin:state.setAdmin.admin,
       show:state.setShow.show,
       clicked:state.setPoll.clicked
   }
};

const mapDispatchToProps = (dispatch)=> ({
    SetPoll:(payload)=>{
        dispatch({
            type:'SET_POLL',
            payload:payload
        })
    },
    ShowSnack:()=>{
        dispatch({
            type:'SHOW_SNACK'
        })
    },
    SetClicked:(payload)=>{
        dispatch({
            type:'SET_CLICK',
            payload:payload
        })
    }
});

const Polls = connect(mapStateToProps,mapDispatchToProps)(PollsComponent);

export {
    Polls
}