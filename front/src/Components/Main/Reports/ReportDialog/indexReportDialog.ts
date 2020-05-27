import {ReportDialog as ReportDialogComponent} from "./ReportDialog";
import {connect} from "react-redux";

export interface PropsReportDialog {
    id:string,
    SetClicked:(number)=>void
}

const mapDispatchToProps = (dispatch)=> ({
    SetClicked:(payload)=>{
        dispatch({
            type:'SET_CLICK',
            payload:payload
        })
    }
});

const ReportDialog = connect(()=>{return {}},mapDispatchToProps)(ReportDialogComponent);

export {
    ReportDialog
}