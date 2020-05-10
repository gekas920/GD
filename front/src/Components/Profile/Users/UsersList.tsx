import React from "react";
import '../Profile.sass'
import {useEffect} from 'react'
import MaterialTable, { Column } from 'material-table';
import Requests from "../../../Requests";

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

    useEffect(()=>{
        Requests.get('/users')
            .then(response=>{
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
            />
        </div>
    )
}

export default Users