import React, {useState} from "react";
import { useForm } from "react-hook-form";
import './Form.sass'
import {Login} from "./FormRequests";


export const LoginForm = () => {
    const { handleSubmit, register, errors , reset} = useForm();
    const [warning,setWarning] = useState('');
    const onSubmit = (values:object) => {
        Login('/login',values)
            .then(result=>{
                switch (result) {
                    case "incorrect data":
                        setWarning('Incorrect data');
                                reset();
                                setTimeout(()=>{
                                    setWarning('')
                                },3000);
                        break;
                    case "invalid password":
                        setWarning('Wrong password');
                                setTimeout(()=>{
                                    setWarning('')
                                },3000);
                        break;
                }
            })
    };

    function inputForm(name:string) {
        return(
            <input
                name={name}
                placeholder={name}
                ref={register({
                    required: 'Required',
                    minLength: 5
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
                <div className='errors'>
                    {warning}
                </div>
                <button type="submit">Log in</button>
            </form>
        </div>
    );
};

