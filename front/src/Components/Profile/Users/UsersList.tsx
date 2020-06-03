import React from "react";
import '../Profile.sass'
import {useEffect} from 'react'
import MaterialTable, { Column } from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import {Profile} from "../indexProfile";
import {UsersListProps} from "./indexUsersList";

interface Row {
    initials:string
    deleted:boolean
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}

export const Users:React.FC<UsersListProps>=(props)=> {
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
        props.SendData('/users');
    },[]);

    useEffect(()=>{
        setState({
            columns: [
                { title: 'Initials', field: 'initials' },
                { title: 'Deleted', field: 'deleted' }
            ],
            data: props.usersList
        })
    },[props.usersList]);

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
};

