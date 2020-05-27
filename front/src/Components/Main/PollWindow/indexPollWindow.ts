import {PollWindow as PollWindowComponent} from "./PollWindow";
import {connect} from "react-redux";

export interface PropsPollWindow {
    description:string,
    count:number,
    key:number,
    id:number,
    link:string,
    SetPoll:(id:number)=>void
}

export const mapDispatchToProps = (dispatch)=> ({
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



const PollWindow = connect(()=>{return {}},mapDispatchToProps)(PollWindowComponent);
export {
    PollWindow
}
