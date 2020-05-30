import {Report as ReportComponent} from "./Report";
import {connect} from "react-redux";
import {CreateReportReq} from "./ReportRequests";

export interface Type {
    type:string
}

export interface PropsReport {
    id:string|number,
    CreateRep:(url,body)=>void
}

const mapDispatchToProps = (dispatch)=> ({
    CreateRep:(url,body)=>{
        dispatch(CreateReportReq(url,body))
    }
});

const Report = connect(()=>{return {}},mapDispatchToProps)(ReportComponent);

export {
    Report
}