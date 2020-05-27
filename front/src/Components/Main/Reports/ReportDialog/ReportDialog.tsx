import React, {useEffect, useState} from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Requests from "../../../../Requests";
import MenuItem from "@material-ui/core/MenuItem";
import './ReportDialog.sass'
import Tooltip from "@material-ui/core/Tooltip";
import ReportIcon from "@material-ui/icons/Report";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {Link} from "react-router-dom"
import {PropsReportDialog} from "./indexReportDialog";


export const ReportDialog:React.FC<PropsReportDialog> = (props)=>{
    const [selected,setSelected] = useState('');
    const [description,setDescription] = useState('');
    const [pollId,setPollId] = useState('');

    useEffect(()=>{
       Requests.get(`/report/${props.id}`)
           .then(response=>{
               if(response){
                   setSelected(response.data.type);
                   setDescription(response.data.description);
                   setPollId(response.data.pollId);
               }
           })
           .catch(()=>{
               window.location.href = '/main/polls'
           })
    },[props.id]);
    const selectField = ()=>{
        if(selected)
            return <MenuItem value={selected}>{selected}</MenuItem>
    };

    const handleReject = ()=>{
      Requests.delete(`/report/${props.id}`)
          .then(response=>{
              if(response)
                  window.location.href = '/main/polls'
          })
    };

    const handleDelete = ()=>{
        Requests.delete(`/poll/${pollId}`)
            .then(response=>{
                if(response)
                    window.location.href='/main/polls'
            })
    };

  return(
      <div>
          <div className='report-dialog'>
              <div className='report-dialog-header'>Report Info</div>
              <FormControl className='report-fields'>
                  <InputLabel>Reason</InputLabel>
                  <Select
                      value={selected}
                      required
                      disabled
                  >
                      {selectField()}
                  </Select>
                  <TextField
                      disabled = {true}
                      style={{
                          marginTop:'10px'
                      }}
                      multiline
                      value={description}
                      required
                      rows={7}
                      placeholder='Description*'
                      variant="outlined"
                  />
              </FormControl>
              <div className='buttons-group' style={{marginTop:'10px'}}>
                  <Tooltip title="Reject" aria-label="reject">
                      <button className='delete-poll'
                              onClick={handleReject}
                              style={{backgroundColor:'#ff9517'}}>
                          <ReportIcon/>
                      </button>
                  </Tooltip>
                  <Tooltip title="Delete poll" aria-label="delete">
                      <button className='delete-poll'  onClick={handleDelete}>
                          <DeleteIcon/>
                      </button>
                  </Tooltip>
                  <Tooltip title="Edit" aria-label="delete">
                      <Link to = {`/main/polls/${pollId}`} className='delete-poll'
                              style={{
                                  backgroundColor:'#ff48b1'
                              }}
                              onClick={()=>{
                                  props.SetClicked(true);
                              }}
                      >
                          <EditIcon/>
                      </Link>
                  </Tooltip>
              </div>
          </div>
      </div>
  )
};

