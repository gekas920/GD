import React, {useState} from "react";
import { useForm } from "react-hook-form";
import './Form.sass'
import Requests from "../../Requests";


export const RegisterForm = () => {
    const { handleSubmit, register, errors ,reset,watch} = useForm();
    const [warning,setWarning] = useState('');
    const onSubmit = (values:any) => {
        let file = values.file;
        const formData = new FormData();
        formData.append(file[0].name,file[0]);
        Requests.logCreate('/register',values)
            .then((response)=>{
                if(!!response.data.accessToken){
                    Requests.uploadAvatar(`/avatar/${response.data.id}`,formData);
                    Requests.setAccessToken(response.data.accessToken);
                    Requests.setRefreshToken(response.data.refreshToken);
                    reset();
                    window.location.href = '/main/polls';
                    return
                }
            })
            .catch((err:Error)=>{
                setWarning('User already exist');
                reset();
                setTimeout(()=>{
                    setWarning('')
                },3000)
            })
    };

    const watchPass = watch("password");
    function inputForm(name:string) {
        switch (name) {
            case 'email':
                return (
                    <input
                        name={name}
                        placeholder={name}
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
            case 'confirm password':
                return (
                    <input
                        name={name}
                        placeholder={name}
                        ref={register({
                            required: 'Required',
                            validate: value=> value === watchPass,
                            pattern: {
                                value: /^[A-Z0-9._%+-]/i,
                                message: "Passwords mismatch"
                            }
                        })}
                        type='password'
                        style = {errors[name] && {border:'2px solid red'}}
                    />
                );
            case 'date':
                return (
                    <input
                        name={name}
                        placeholder={name}
                        ref={register({
                            required: 'Required'
                        })}
                        type='date'
                        style = {errors[name] && {border:'2px solid red'}}
                    />
                );
            case 'file':
                return (
                    <div className='fileInput-container'>
                        <input
                            className='fileInput'
                            name={name}
                            placeholder={name}
                            ref={register({
                                required: 'Required'
                            })}
                            type='file'
                            style = {errors[name] && {border:'2px solid red'}}
                        />
                    </div>
                );
            default:
                return(
                    <input
                        name={name}
                        placeholder={name}
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
            <form onSubmit={handleSubmit(onSubmit)} className='inputs'>
                {inputForm('login')}
                {inputForm('password')}
                {inputForm('confirm password')}
                {inputForm('email')}
                {inputForm('initials')}
                {inputForm('date')}
                {inputForm('about')}
                {inputForm('file')}
                <div className='errors'>
                    {warning}
                </div>
                <button type="submit">Sign in</button>
            </form>
        </div>
    );
};

