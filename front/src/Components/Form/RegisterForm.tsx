import React, {useState} from "react";
import { useForm } from "react-hook-form";
import './Form.sass'
import Requests from "../../Requests";



const RegisterForm = () => {
    const { handleSubmit, register, errors ,reset} = useForm();
    const [warning,setWarning] = useState('');
    const onSubmit = (values:object) => {
        Requests.logCreate('/register',values)
            .then((response)=>{
                if(!!response.data.token){
                    Requests.setToken(response.data.token);
                    reset();
                    window.location.href = '/main';
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

    function inputForm(name:string,type?:boolean) {
        if(type)
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

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='inputs'>
                {inputForm('login')}
                {inputForm('password')}
                {inputForm('name')}
                {inputForm('email')}
                <div className='errors'>
                    {warning}
                </div>
                <button type="submit">Sign in</button>
            </form>
        </div>
    );
};

export default RegisterForm