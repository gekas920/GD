import React from "react";
import '../Profile.sass'
import {useEffect} from 'react'
import MaterialTable, { Column } from 'material-table';
import Requests from "../../../Requests";
import Dialog from '@material-ui/core/Dialog';
import Profile from "../Profile";

interface Row {
    initials:string
    deleted:boolean
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

function Users(props) {
    const [state, setState] = React.useState<TableState>({
        columns: [
            { title: 'Initials', field: 'initials' },
            { title: 'Deleted', field: 'deleted' }
        ],
        data: []
    });
    const [open,openDialog] = React.useState(false);
    const [row,getData] = React.useState();
    const rowClick = (event: any,rowData:any)=>{
        openDialog(true);
        getData(rowData);
    };

    const closeDialog = ()=>{
      openDialog(false);
    };



    useEffect(()=>{
        Requests.get('/users')
            .then(response=>{
                console.log(response.data);
                setState({
                    columns: [
                        { title: 'Initials', field: 'initials' },
                        { title: 'Deleted', field: 'deleted' }
                    ],
                    data: response.data
                })
            })
    },[]);

    return(
        <div className='companies-info-box'>
            <MaterialTable
                title="User List"
                columns={state.columns}
                data={state.data}
                style={{width:'70%'}}
                options={{
                    pageSizeOptions:[5,10]
                }}
                onRowClick={rowClick}
            />
            {!!row &&
            <Dialog open={open} onClose={closeDialog} fullWidth={true} maxWidth='xs'><Profile
                url ={`/profile/${row.id}`}/>
            </Dialog>
            }
        </div>
    )
}

export default Users