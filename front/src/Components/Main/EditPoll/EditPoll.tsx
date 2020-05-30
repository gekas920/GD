import React, {useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import Requests from "../../../Requests";
import ReplayIcon from '@material-ui/icons/Replay'
import {filter} from "../indexMain";
import Tooltip from "@material-ui/core/Tooltip";
import {PropsEditPoll} from "./indexEditPoll";
import {getData} from "./EditPollRequests";

export const EditPoll:React.FC<PropsEditPoll> = (props) =>{
    const { handleSubmit, register} = useForm();
    const [list, setList] = useState([{ option: "" }]);
    const [disabled,setDisabled] = useState(false);
    const [error,setError]= useState('');
    const [title,setTitle] = useState('');

    const onSubmit = (values) => {
        let files = values.file;
        const formData = new FormData();
        for(let i = 0;i<files.length;i++){
            formData.append(files[i].name,files[i])
        }
        formData.append('draft','');
        let filtered = filter(values,elem=>!!elem);
        for (let key in filtered){
            formData.append(key,filtered[key])
        }
        props.EditPollReq(`/poll/update/${props.id}`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
    };

    const addInput = () => {
        list.push({ option: "" });
        setList([...list]);
    };

    useEffect(()=>{
        getData(`/poll/${props.id}`)
            .then(result=>{
                setTitle(result.title);
                setList(result.fields);
            });
    },[]);

    useEffect(()=>{
        if(props.exist){
            setError('Already exist');
            setTimeout(()=>{
                props.HideEx();
                setError('')
            },2000);
        }
    },[props.exist]);



    return(
        <div className='companies-info-box'>
            <Tooltip title="Back" aria-label="back">
                <button
                    onClick={()=>props.SetClicked(false)}
                    className='back-edit-button'>
                    <ReplayIcon/>
                </button>
            </Tooltip>
            <div className='main-form'>
                <form onSubmit={handleSubmit(onSubmit)} className='inputs'>
                    <input
                        placeholder={'Enter title'}
                        name='title'
                        defaultValue={title}
                        required={true}
                        ref={register()}
                    />
                    {list.map((n, i) => (
                        <div
                            key={i + '1'}
                            style={{
                                display:'flex',
                                justifyContent:'center'
                            }}>
                            <input type='checkbox'
                                   name={i.toString()+'c'}
                                   style={{width:'18px'}}
                                   ref={register()}
                                   disabled={disabled}
                                   onClick={()=>setDisabled(true)}
                            />
                            <input
                                style={{
                                    width:'280px'
                                }}
                                placeholder={'Enter variant'}
                                key={i}
                                name={i.toString()}
                                defaultValue={n.option}
                                required={true}
                                ref={register()}
                            />
                        </div>
                    ))}
                    <input
                        placeholder={'Upload file'}
                        style={{
                            marginBottom: '-5px',
                            paddingTop: '5px',
                            width: '130px',
                            border: 0,
                            margin:'0 auto'
                        }}
                        ref={register()}
                        name='file'
                        required={true}
                        type='file'
                        multiple
                    />
                    <button onClick={addInput}>Add</button>
                    <button type="submit">Publish</button>
                </form>
                <div className='errors'>
                    {error}
                </div>
            </div>
        </div>
    )
};


