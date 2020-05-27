import {Report as ReportComponent} from "./Report";
import {connect} from "react-redux";

export interface Type {
    type:string
}

export interface PropsReport {
    id:string|number,
    ShowSnack:()=>void
}

const mapDispatchToProps = (dispatch)=> ({
    ShowSnack:()=>{
        dispatch({
            type:'SHOW_SNACK'
        })
    }
});

const Report = connect(()=>{return {}},mapDispatchToProps)(ReportComponent);

export {
    Report
}