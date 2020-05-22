import React, {useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import Requests from "../../../Requests";
import {connect} from "react-redux";
import {filter, mapDispatchToProps, mapStateToProps} from "../indexMain";

const AddPoll = (props) =>{
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
        Requests.update(`/poll/update/${props.id}`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }).then(result=>{
            if (result)
                window.location.href = `/main/polls/${result.data.id}`;
            else {
                setError('Already exist');
                setTimeout(()=>{
                    setError('')
                },2000);
            }
        })
    };

    const addInput = () => {
        list.push({ option: "" });
        setList([...list]);
    };

    useEffect(()=>{
        Requests.get(`/poll/${props.id}`)
            .then(response=>{
                setTitle(response.data.title);
                setList(response.data.fields);
            })
    },[]);



    return(
        <div className='companies-info-box'>
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


export default connect(mapStateToProps,mapDispatchToProps)(AddPoll)