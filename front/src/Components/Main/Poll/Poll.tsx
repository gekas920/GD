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
import SendIcon from '@material-ui/icons/Send'
import EditIcon from '@material-ui/icons/Edit'
import EditPoll from "../EditPoll/EditPoll";
import Tooltip from '@material-ui/core/Tooltip';
import ReportIcon from '@material-ui/icons/Report'
import {Dialog} from "@material-ui/core";
import Report from "../Report/Report";


const pollAnswers = [
    { option: '', votes: 0 },
];
const pollStyles1 = {
    questionSeparator: true,
    questionSeparatorWidth: 'question',
    questionBold: true ,
    questionColor: 'white',
    align: 'center',
    theme: 'white',
};

const Polls = (props)=>{
    const [question,setQuestion] = useState('');
    const [answers,setAnswers] = useState(pollAnswers);
    const [images,setImages] = useState([]);
    const [draft,setDraft] = useState(true);
    const [show,setShow] = useState(false);
    const [vote,setVote] = useState(false);
    const [correct,setCorrect] = useState('');
    const [error,setError] = useState('');
    const [open,setOpen] = useState(false);
    const [name,setName] = useState('');


    let idArr = window.location.pathname.split('/');
    let id = idArr[idArr.length-1];

    const handleDelete = ()=>{
        Requests.delete(`/poll/${props.setPoll.clicked ||id}`)
            .then(response=>{
                if(response)
                    window.location.href='/main/polls'
            })
    };

    const handlePublish = ()=>{
      Requests.update(`/poll/publish/${id}`)
          .then(response=>{
              if(response)
                  window.location.href=`/main/polls/${id}`
          })
    };

    const getCorrect = (arr)=>{
      arr.forEach(elem=>{
          if(elem.correct){
              setCorrect(elem.option)
          }
      })
    };


    useEffect(()=>{
        Requests.get(`/poll/${props.setPoll.clicked ||id}`)
            .then(response=>{
                getCorrect(response.data.fields);
                setDraft(response.data.draft);
                setQuestion(response.data.title);
                setImages(response.data.images);
                setName(response.data.name);
                let fields = response.data.fields.map(elem=>{
                    let obj = Object.assign({},elem);
                    delete obj.correct;
                    return obj
                });
                setAnswers(fields);
            });
        Requests.get(`/poll/votes/${props.setPoll.clicked || id}`)
            .then(response=>{
                setVote(response.data.vote);
            })
    },[props.setPoll]);

    const handleVote = voteAnswer => {
        if(correct && (correct!==voteAnswer)){
            setError(correct)
        }
        const  pollAnswers:{ option: string; votes: number; }[]  = answers;
        const newPollAnswers = pollAnswers.map(answer => {
            if (answer.option === voteAnswer) answer.votes++;
            return answer
        });
        setAnswers(newPollAnswers);
        Requests.update(`/poll/${props.setPoll.clicked || id}`,newPollAnswers)
    };

    let def = window.location.pathname.includes('my');
    const path = def ? 'none' : '';

    return (
        <div>
            {props.setShow.show && <EditPoll id={props.setPoll.clicked || id}/>}
            <Dialog open={open} onClose={()=>setOpen(false)}><Report id={id || props.setPoll.clicked}/></Dialog>
            {draft &&
            <div>
                <button className='back-btn' onClick={()=>setShow(prevState => !prevState)}>
                    <EditIcon/>
                </button>
                {show && <EditPoll id={props.setPoll.clicked || id}/>}
            </div>
            }
            <div className='main-poll'>
                <div className='poll-window' style={{overflow:'scroll'}}>
                    <PollCarousel images = {images}/>
                    <div style={{
                        color:"white",
                        fontStyle:'italic',
                        margin:'0 auto',
                    }}>
                        By {name}
                    </div>
                    <div style={{
                        pointerEvents: (path || vote) ? 'none' : 'all'
                    }}>
                        <Poll question={question} answers={answers}
                              onVote={handleVote}
                              noStorage={true}
                              customStyles = {pollStyles1}
                        />
                        {error &&
                        <div className='error'>
                            Correct answer is {error}
                        </div>
                        }
                    </div>
                    <div className='buttons-group'>
                        {window.location.pathname.includes('polls') &&
                        <Tooltip title="Report" aria-label="report">
                            <button className='delete-poll'
                                    style={{backgroundColor:'#ff9517'}}
                                    onClick={()=>setOpen(true)}
                            >
                                <ReportIcon/>
                            </button>
                        </Tooltip>
                        }
                        {(props.setAdmin.admin || window.location.pathname.includes('my')) &&
                        <Tooltip title="Delete" aria-label="delete">
                            <button className='delete-poll' onClick={handleDelete}>
                                <DeleteIcon/>
                            </button>
                        </Tooltip>
                        }
                        {
                            (props.setAdmin.admin && window.location.pathname.includes('polls')) &&
                            <Tooltip title="Edit" aria-label="delete">
                                <button className='delete-poll'
                                        style={{
                                            backgroundColor:'#ff48b1'
                                        }}
                                        onClick={()=>props.SetClicked(true)}>
                                    <EditIcon/>
                                </button>
                            </Tooltip>
                        }
                        {def && draft &&
                        <button className='publish-poll' onClick={handlePublish}>
                            <SendIcon/>
                            Publish
                        </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps,mapDispatchToProps)(Polls)