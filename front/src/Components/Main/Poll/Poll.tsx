import React, {useState,useEffect} from 'react';
import Poll from 'react-polls';

// Declaring poll question and answers
const pollQuestion = 'Is react-polls useful?';
const pollAnswers1 = [
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
            <Poll question={pollQuestion} answers={pollAnswers1}
                  onVote={handleVote}
                  noStorage={true}
                  customStyles = {pollStyles1}
            />
        </div>
    );
};

export default Polls