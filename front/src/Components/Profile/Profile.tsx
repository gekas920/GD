import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import '../Form/Form.sass'
import Requests from "../../Requests";
import {mapDispatchToProps, mapStateToProps, userData} from "./indexProfile";
import {connect} from "react-redux";
import Snack from "../Snack/Snack";
import './Profile.sass'
import ArrowIcon from '@material-ui/icons/ArrowForward';
import ArrowIconBack from '@material-ui/icons/ArrowBack';
import Users from "./Users/UsersList";


const Profile = (props) => {
    const { handleSubmit, register, errors} = useForm();
    const [data,updateData] = useState({
        email:'',
        date:'',
        initials:'',
        about:'',
        img:''
    });
    const [show,showBlock] = useState(false);
    const showElem = ()=>{
        showBlock(prevState => !prevState);
    };
    const onSubmit = (values:Record<string, userData>) => {
        Requests.update('/profile',values)
            .then((response)=>{
                if(response){
                    props.ShowSnack();
                }
            })
    };

    const handleClick = ()=>{
      localStorage.clear();
      window.location.href = '/'
    };


    useEffect(()=>{
       Requests.get('/profile')
           .then(result=>{
               result.data.date = result.data.date.split('T')[0];
               updateData(result.data);
           })
    },[]);

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
            <div>
                <button className='back-btn' onClick={showElem}>
                    {!show && <ArrowIcon/>}
                    {show && <ArrowIconBack/>}
                </button>
                {show && <Users/>}
            </div>
        <div className='main-form'>
            <form onSubmit={handleSubmit(onSubmit)} className='inputs'>
                <img src={data.img} style={{maxWidth:'300px',marginBottom:'10px'}} alt='avatar'/>
                {inputForm('email')}
                {inputForm('initials')}
                {inputForm('date')}
                {inputForm('about')}
                <button type="submit">Confirm changes</button>
                <button onClick={handleClick}>Log out</button>
            </form>
            <Snack/>
        </div>
        </div>
    );
};

export default connect(mapStateToProps,mapDispatchToProps)(Profile)