import React, {useState} from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Fade from 'react-reveal/Fade';
import './Form.sass'


function AllForms(){
    const [choose,setState] = useState(0);
    function handleClick(number:number) {
        setState(number)
    }
    return(
        <div className='main-form'>
            <div className='spans'>
                <span onClick={()=>handleClick(0)}>Log in</span>
                <span onClick={()=>handleClick(1)}>Sign in</span>
            </div>
            {!choose && <Fade left><LoginForm/></Fade>}
            {!!choose && <Fade right><RegisterForm/></Fade>}
        </div>
    )
}

export default AllForms