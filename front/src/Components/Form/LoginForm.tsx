import React, {useState} from "react";
import { useForm } from "react-hook-form";
import './Form.sass'
import Requests from "../../Requests";


const LoginForm = () => {
    const { handleSubmit, register, errors , reset} = useForm();
    const [warning,setWarning] = useState('');
    const onSubmit = (values:object) => {
        console.log(values);
        Requests.logCreate('/login',values)
            .then((response)=>{
                if(!!response.data.accessToken){
                    Requests.setAccessToken(response.data.accessToken);
                    Requests.setRefreshToken(response.data.refreshToken);
                    reset();
                    window.location.href = '/main';
                    return
                }
                if(response.data.status === 'not found'){
                    setWarning('Incorrect data');
                    reset();
                    setTimeout(()=>{
                        setWarning('')
                    },3000)
                }
                if(response.data.status === 'invalid password'){
                    setWarning('Wrong password');
                    setTimeout(()=>{
                        setWarning('')
                    },3000)
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

export default LoginForm