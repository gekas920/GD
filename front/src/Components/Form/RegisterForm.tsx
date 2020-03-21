import React from "react";
import { useForm } from "react-hook-form";
import './Form.sass'


const RegisterForm = () => {
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = (values:string|any) => {
        console.log(values);
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
                            message: "invalid email address"
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
                    minLength: 5
                })}
                type={name}
                style = {errors[name] && {border:'2px solid red'}}
            />
        )
    }

    return (
        <div>
            <div>
                Error
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='inputs'>
                {inputForm('login')}
                {inputForm('password')}
                {inputForm('email')}
                <button type="submit">Sign in</button>
            </form>
        </div>
    );
};

export default RegisterForm