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

const pollAnswers = [
    { option: '', votes: 0 },
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
    const [answers,setAnswers] = useState(pollAnswers);
    const [images,setImages] = useState([]);

    const handleDelete = ()=>{
        let idArr = window.location.pathname.split('/');
        let id = idArr[idArr.length-1];
        Requests.delete(`/poll/${props.setPoll.clicked ||id}`)
            .then(response=>{
                if(response)
                    window.location.href='/main/polls'
            })
    };

    useEffect(()=>{
        let idArr = window.location.pathname.split('/');
        let id = idArr[idArr.length-1];
        Requests.get(`/poll/${props.setPoll.clicked ||id}`)
            .then(response=>{
                console.log(response);
                setQuestion(response.data.title);
                setImages(response.data.images);
                let fields = response.data.fields.map(elem=>{
                    let obj = Object.assign({},elem);
                    delete obj.correct;
                    return obj
                });
                setAnswers(fields);
            })
    },[props]);

    const handleVote = voteAnswer => {
        const  pollAnswers:{ option: string; votes: number; }[]  = answers;
        const newPollAnswers = pollAnswers.map(answer => {
            if (answer.option === voteAnswer) answer.votes++;
            return answer
        });
        console.log(props);
        setAnswers(newPollAnswers);
        Requests.update(`/poll/${props.setPoll.clicked}`,newPollAnswers)
    };
    return (
        <div>
            <div className='main-poll'>
                <div className='poll-window' style={{overflow:'scroll'}}>
                    <PollCarousel images = {images}/>
                    <Poll question={question} answers={answers}
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