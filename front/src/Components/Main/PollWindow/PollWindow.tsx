import React from 'react'
import {connect} from "react-redux";
import {Link} from "react-router-dom"
import {mapDispatchToProps, mapStateToProps} from "../indexMain";

const PollWindow = (props)=>{
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


export default connect(mapStateToProps,mapDispatchToProps)(PollWindow)