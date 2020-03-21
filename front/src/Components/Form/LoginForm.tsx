import React from "react";
import { useForm } from "react-hook-form";
import './Form.sass'


const LoginForm = () => {
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = (values:string|any) => {
        console.log(values);
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
            <div>
                Error
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='inputs'>
                {inputForm('login')}
                {inputForm('password')}
                <button type="submit">Log in</button>
            </form>
        </div>
    );
};

export default LoginForm