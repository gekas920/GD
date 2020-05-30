import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import '../Form/Form.sass'
import {ProfileProps, userData} from "./indexProfile";
import './Profile.sass'
import ArrowIcon from '@material-ui/icons/ArrowForward';
import ArrowIconBack from '@material-ui/icons/ArrowBack';
import DeleteForever from '@material-ui/icons/DeleteForever'
import DeleteIcon from '@material-ui/icons/Delete'
import Replay from '@material-ui/icons/Replay'
import Tooltip from "@material-ui/core/Tooltip";
import {Users} from "./Users/indexUsersList";
import {GetUser} from "./ProfileRequests";

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
        props.UpdateInfo(props.url,values)
    };

    const goBack = ()=>{
        let id = props.url.split('/')[2];
        props.UpdateInfo(`/profile/back/${id}`)
    };

    const handleClick = ()=>{
      localStorage.clear();
      window.location.href = '/'
    };

    const deleteVariables = (variable:boolean)=>{
        let id = props.url.split('/')[2];
        if(variable){
            props.DeleteUser(`/profile/forever/${id}`)
        }
        else {
            props.DeleteUser(`/profile/delete/${id}`);
        }
    };

    useEffect(()=>{
        GetUser(props.url)
            .then(result=>{
                result.date = result.date.split('T')[0];
                updateData(result);
            });
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
                                value: /^[A-Z0-9\s._%+-]{5}/i,
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
