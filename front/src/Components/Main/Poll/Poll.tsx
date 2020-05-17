import React, {useState} from 'react';
import Poll from 'react-polls';
import './Poll.sass'
import PollCarousel from "./PollCarousel/Carousel";
import '../../Profile/Profile.sass'

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

const Polls = ()=>{
    const [question,setQuestion] = useState('');
    const [answers,setAnswers] = useState(pollAnswers1);
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
                </div>
            </div>
        </div>
    );
};

export default Polls