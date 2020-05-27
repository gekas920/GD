import React from 'react'
import {Link} from "react-router-dom"
import {PropsPollWindow} from "./indexPollWindow";

export const PollWindow:React.FC<PropsPollWindow> = (props)=>{
    const handleClick = ()=>{
        props.SetPoll(props.id)
    };

    const link = props.link ?  `/main/my/${props.id}` : `/main/polls/${props.id}`;

    return(
        <Link className='window' onClick={handleClick} to = {link}>
            <div className='window-description' >
                {props.description}
            </div>
            <div className='window-count'>
                {props.count || 0}
            </div>
        </Link>
    )
};


