import React, {useEffect, useState} from 'react';
import Poll from 'react-polls';
import './Poll.sass'
import '../../Profile/Profile.sass'
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from '@material-ui/icons/Send'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip';
import ReportIcon from '@material-ui/icons/Report'
import {Dialog} from "@material-ui/core";
import {EditPoll} from "../EditPoll/indexEditPoll";
import {PropsPoll} from "./indexPoll";
import {Report} from "../Report/indexReport";
import {PollCarousel} from "./PollCarousel/indexCarousel";
import {CheckPrivate, GetInfo, PollAction, PollDelete, UpdatePoll} from "./PollRequests";
import {Elem} from "../Categories/indexCategories";


const pollAnswers = [
    { option: '', votes: 0 },
];
const pollStyles = {
    questionSeparator: true,
    questionSeparatorWidth: 'question',
    questionBold: true ,
    questionColor: 'white',
    align: 'center',
    theme: 'white',
};

export const Polls:React.FC<PropsPoll> = (props)=>{
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
    const [privatePoll,setPrivate] = useState(false);
    const [categories,setCategories] = useState([]);


    let idArr = window.location.pathname.split('/');
    let id = idArr[idArr.length-1];

    const handleDelete = ()=>{
        PollDelete(`/poll/${props.clicked ||id}`);
    };

    const handlePublish = ()=>{
        PollAction(`/poll/publish/${id}`);
    };

    const getCorrect = (arr)=>{
      arr.forEach(elem=>{
          if(elem.correct){
              setCorrect(elem.option)
          }
      })
    };


    useEffect(()=>{
        CheckPrivate(`/poll/private/${props.clicked || id}`)
            .then(result=>{
               if(result === 'private_ok')
                   setPrivate(true)
            });
        GetInfo(`/poll/${props.clicked ||id}`)
            .then(result=>{
                getCorrect(result.fields);
                setDraft(result.draft);
                setQuestion(result.title);
                setImages(result.images);
                setName(result.name);
                setCategories(result.categories);
                let fields = result.fields.map(elem=>{
                    let obj = Object.assign({},elem);
                    delete obj.correct;
                    return obj
                });
                setAnswers(fields);
            });
        GetInfo(`/poll/votes/${props.clicked || id}`)
            .then(result=>{
                setVote(result.vote);
            });
    },[id,props.clicked]);

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
        UpdatePoll(`/poll/${props.clicked || id}`,newPollAnswers);
    };

    const getCategories = ()=>{
        if(categories)
            return <div style={{
                position:'relative',
                color:"white",
                fontStyle:'italic',
                display:'flex',
                justifyContent:'center',
                marginBottom:'10px'
            }}>Categories :
                {categories.map((elem:Elem)=>{
                    return <div style={{marginRight:'5px',marginLeft:'5px'}}>{elem.type}</div>
                })}
            </div>
    };

    let def = window.location.pathname.includes('my');
    const path = def ? 'none' : '';

    return (
        <div>
            {props.show && <EditPoll id={props.clicked || id}/>}
            <Dialog open={open} onClose={()=>setOpen(false)}><Report id={id || props.clicked}/></Dialog>
            {draft &&
            <div>
                <button className='back-btn' onClick={()=>setShow(prevState => !prevState)}>
                    <EditIcon/>
                </button>
                {show && <EditPoll id={props.clicked || id}/>}
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
                              customStyles = {pollStyles}
                        />
                        {categories.length && getCategories()}
                        {privatePoll &&
                        <div style={{
                            color:"white",
                            fontStyle:'italic',
                            margin:'0 auto',
                        }}>
                            It's a private poll. Link : localhost:3001/main/polls/{id}
                        </div>
                        }
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
                        {(props.admin || window.location.pathname.includes('my')) &&
                        <Tooltip title="Delete" aria-label="delete">
                            <button className='delete-poll' onClick={handleDelete}>
                                <DeleteIcon/>
                            </button>
                        </Tooltip>
                        }
                        {
                            (props.admin && window.location.pathname.includes('polls')) &&
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
