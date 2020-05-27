import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import '../Form/Form.sass'
import Requests from "../../Requests";
import {ProfileProps, userData} from "./indexProfile";
import './Profile.sass'
import ArrowIcon from '@material-ui/icons/ArrowForward';
import ArrowIconBack from '@material-ui/icons/ArrowBack';
import DeleteForever from '@material-ui/icons/DeleteForever'
import DeleteIcon from '@material-ui/icons/Delete'
import Replay from '@material-ui/icons/Replay'
import Tooltip from "@material-ui/core/Tooltip";
import {Users} from "./Users/indexUsersList";

export const Profile:React.FC<ProfileProps> = (props) => {
    const { handleSubmit, register, errors} = useForm();
    const [data,updateData] = useState({
        email:'',
        date:'',
        initials:'',
        about:'',
        img:'',
        admin:props.admin
    });
    const [show,showBlock] = useState(false);
    const showElem = ()=>{
        showBlock(prevState => !prevState);
    };
    const onSubmit = (values:Record<string, userData>) => {
        Requests.update(props.url,values)
            .then((response)=>{
                if(response){
                    props.ShowSnack();
                }
            })
    };

    const goBack = ()=>{
        let id = props.url.split('/')[2];
        Requests.update(`/profile/back/${id}`)
            .then((response)=>{
                if(response)
                    props.ShowSnack();
            })
    };

    const handleClick = ()=>{
      localStorage.clear();
      window.location.href = '/'
    };

    const deleteVariables = (variable:boolean)=>{
        let id = props.url.split('/')[2];
        if(variable){
            Requests.delete(`/profile/forever/${id}`)
                .then((response)=>{
                    if(response){
                        props.ShowSnack();
                    }
                })
        }
        else {
            Requests.delete(`/profile/delete/${id}`)
                .then((response)=>{
                    if(response){
                        props.ShowSnack();
                    }
                });
        }
    };

    useEffect(()=>{
       Requests.get(props.url)
           .then(result=>{
               result.data.date = result.data.date.split('T')[0];
               updateData(result.data);
           })
    },[props.url]);

    function inputForm(name:string) {
        switch (name) {
            case 'email':
                return (
                    <input
                        name={name}
                        placeholder={name}
                        defaultValue={data.email}
                        ref={register({
                            required: 'Required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email address"
                            }
                        })}
                        type={name}
                        style = {errors[name] && {border:'2px solid red'}}
                    />
                );
            case 'date':
                return (
                    <input
                        name={name}
                        placeholder={name}
                        defaultValue={data.date}
                        ref={register({
                            required: 'Required'
                        })}
                        type='date'
                        style = {errors[name] && {border:'2px solid red'}}
                    />
                );
            default:
                return(
                    <input
                        name={name}
                        placeholder={name}
                        defaultValue = {data[name]}
                        ref={register({
                            required: 'Required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]{5}/i,
                                message: `Too short ${name}`
                            }
                        })}
                        type={name}
                        style = {errors[name] && {border:'2px solid red'}}
                    />
                )
        }
    }
    return (
        <div>
            {
                (props.url === '/profile' && data.admin) &&
                <div>
                    <Tooltip title="Show / Hide list" aria-label="sh">
                        <button className='back-btn' onClick={showElem}>
                            {!show && <ArrowIcon/>}
                            {show && <ArrowIconBack/>}
                        </button>
                    </Tooltip>
                    {show && <Users/>}
                </div>
            }
            <div className='main-form'>
                <form onSubmit={handleSubmit(onSubmit)} className='inputs'>
                    <img src={data.img} style={{maxWidth:'300px',marginBottom:'10px'}} alt='avatar'/>
                    {inputForm('email')}
                    {inputForm('initials')}
                    {inputForm('date')}
                    {inputForm('about')}
                    <button type="submit">Confirm changes</button>
                    {props.url === '/profile' && <button onClick={handleClick}>Log out</button>}
                </form>
                {props.url !== '/profile' &&
                <div>
                    <div className='delete-block'>
                        <button className='delete-button'
                                disabled = {data.admin}
                                onClick={()=>deleteVariables(true)}>
                            <DeleteForever/>
                        </button>
                        <button className='delete-button'
                                disabled = {data.admin}
                                onClick={()=>deleteVariables(false)}>
                            <DeleteIcon/>
                        </button>
                    </div>
                    <button className='remove-button'
                            disabled = {data.admin}
                            onClick={goBack}>
                        <Replay/>
                    </button>
                </div>
                }
            </div>
        </div>
    );
};
