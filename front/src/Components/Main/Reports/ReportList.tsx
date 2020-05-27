import React, {useEffect} from 'react'
import MaterialTable, {Column} from "material-table";
import Requests from "../../../Requests";
import Dialog from "@material-ui/core/Dialog";
import {ReportDialog} from "./ReportDialog/indexReportDialog";

interface Row {
    title:string
    type:string
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

const ReportList = ()=>{
    const [state, setState] = React.useState<TableState>({
        columns: [
            { title: 'Title', field: 'title' },
            { title: 'Type', field: 'type' }
        ],
        data: []
    });
    const [open,openDialog] = React.useState(false);
    const [id,getData] = React.useState();

    const rowClick = (event: any, rowData:any)=>{
        openDialog(true);
        getData(rowData.id);
    };

    useEffect(()=>{
       Requests.get('/report')
           .then(response=>{
               if(response)
                   setState({
                       columns:[
                           { title: 'Title', field: 'title' },
                           { title: 'Type', field: 'type' }
                       ],
                       data:response.data
                   })
           })
    },[]);

    return(
        <div className='companies-info-box'>
            {!!id &&
            <Dialog open={open} onClose={()=>openDialog(false)} fullWidth={true} maxWidth='xs'>
                <ReportDialog id={id}/>
            </Dialog>
            }
            <MaterialTable
                title="Reports"
                columns={state.columns}
                data={state.data}
                style={{width:'70%'}}
                options={{
                    pageSizeOptions:[5,10]
                }}
                onRowClick={rowClick}
            />
        </div>
    )
};

export default ReportList