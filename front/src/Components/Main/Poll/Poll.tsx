import React, {useEffect, useState} from 'react';
import Poll from 'react-polls';
import './Poll.sass'
import PollCarousel from "./PollCarousel/Carousel";
import '../../Profile/Profile.sass'
import {connect} from "react-redux";
import {mapDispatchToProps} from "../indexMain";
import DeleteIcon from "@material-ui/icons/Delete";
import {mapStateToProps} from "../../Profile/indexProfile";
import Requests from "../../../Requests";

const pollQuestion = 'Is react-polls useful?';
const pollAnswers1 = [
    { option: 'First', votes: 0 },
    {option: 'Second',votes:2}
];
const pollStyles1 = {
    questionSeparator: true,
    questionSeparatorWidth: 'question',
    questionBold: true ,
    questionColor: 'white',
    align: 'center',
    theme: 'white'
};

const Polls = (props)=>{
    const [question,setQuestion] = useState('');
    const [answers,setAnswers] = useState(pollAnswers1);

    const handleDelete = ()=>{
        let idArr = window.location.pathname.split('/');
        let id = idArr[idArr.length-1];
        Requests.delete(`/poll/${props.setPoll.id ||id}`)
            .then(response=>{
                if(response)
                    window.location.href='/main/polls'
            })
    };

    useEffect(()=>{
        let idArr = window.location.pathname.split('/');
        let id = idArr[idArr.length-1];
        Requests.get(`/poll${props.setPoll.id ||id}`)
            .then(response=>{
                console.log(response)
            })
    },[props]);

    const handleVote = voteAnswer => {
        const  pollAnswers:{ option: string; votes: number; }[]  = answers;
        const newPollAnswers = pollAnswers.map(answer => {
            console.log(answer);
            if (answer.option === voteAnswer) answer.votes++;
            return answer
        });
        setAnswers(newPollAnswers);
    };
    return (
        <div>
            <div className='main-poll'>
                <div className='poll-window'>
                    <PollCarousel/>
                    <Poll question={pollQuestion} answers={pollAnswers1}
                          onVote={handleVote}
                          noStorage={true}
                          customStyles = {pollStyles1}
                    />
                    {props.setAdmin.admin &&
                    <button className='delete-poll' onClick={handleDelete}>
                        <DeleteIcon/>
                    </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps,mapDispatchToProps)(Polls)