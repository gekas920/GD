import React, {useState, useEffect, ChangeEvent} from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './Report.sass'
import {Input, TextField} from "@material-ui/core";
import Requests from "../../../Requests";
import {mapDispatchToProps, Type} from "./indexReport";
import {useForm} from "react-hook-form";
import SendIcon from "@material-ui/icons/Send";
import {connect} from "react-redux";


const Report = (props)=>{
    const { handleSubmit, register} = useForm();
    const [selected, setSelected] = useState('');
    const [types,setTypes] = useState([]);
    const [error,setError] = useState(false);
    const [text,setText] = useState('');
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelected(event.target.value as string);
    };

    const textChange = (event:ChangeEvent<HTMLTextAreaElement>)=>{
        setText(event.target.value)
    };

    useEffect(()=>{
        Requests.get('/reasons')
            .then(response=>{
                setTypes(response.data)
            })
    },[]);

    const onSubmit = () =>{
      Requests.create('/report',{
          type:selected,
          description:text,
          pollId:props.id
      })
          .then(response=>{
              if(response)
                  props.ShowSnack();
          })
    };


    const selectField = ()=>{
        if(types)
            return types.map((elem:Type,index:number)=>{
                return <MenuItem value={elem.type} key={index}>{elem.type}</MenuItem>
            })
    };

    return(
        <div className='report'>
            <div className='report-header'>Report</div>
            <form onSubmit={handleSubmit(onSubmit)} className='report-form'>
            <FormControl error={error}>
                <InputLabel>Reason</InputLabel>
                <Select
                    value={selected}
                    required
                    onChange={handleChange}
                    input={<Input id="name" required ref={register()}/>}
                >
                    {selectField()}
                </Select>
                <TextField
                    style={{
                        marginTop:'10px'
                    }}
                    multiline
                    required
                    rows={7}
                    onChange={textChange}
                    placeholder='Description*'
                    variant="outlined"
                />
            </FormControl>
                <button type='submit'
                        className='publish-poll'
                        style={{
                            width:'150px',
                            height:'40px',
                            marginTop:'10px'
                        }}
                        onClick={() => setError(!selected)}>
                    <SendIcon/>
                    Send
                </button>
            </form>
        </div>
    )
};


export default connect(()=>{},mapDispatchToProps)(Report)