import React, {useState} from 'react'
import {connect} from "react-redux";
import {Link} from "react-router-dom"
import {mapDispatchToProps, mapStateToProps} from "../indexMain";

const PollWindow = (props)=>{
    const [link,setLink] = useState('/main/polls');
    const handleClick = ()=>{
        setLink(`/main/polls/${props.id}`);
        props.SetPoll(props.id)
    };

    const link1 = `/main/polls/${props.id}`;

    return(
        <Link className='window' onClick={handleClick} to = {link1}>
            <div className='window-description' >
                {props.description}
            </div>
            <div className='window-count'>
                {props.count}
            </div>
        </Link>
    )
};


export default connect(mapStateToProps,mapDispatchToProps)(PollWindow)