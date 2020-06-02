import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {AddCategory, DeleteCategory, GetCategories} from "./CategoriesRequests";
import {Elem} from "./indexCategories";
import {ExpansionPanelDetails} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Add from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import DoneIcon from '@material-ui/icons/Done'
import Tooltip from "@material-ui/core/Tooltip";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '400px',
            overflowX:'hidden',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }),
);

export const CategoriesList = ()=> {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [categories,setCategories] = useState<Elem[]>([]);
    const [show,setShow] = useState(false);
    const [inputValue,setInputValue] = useState('');
    const [error,setError] = useState(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(()=>{
       GetCategories('/categories')
           .then(result=>{
               if(result)
                   setCategories(result)
           })
    },[]);

    const deleteCategory = (id)=>{
        let arr = categories.filter((elem:Elem)=>{
            return elem.id !== id
        });
        DeleteCategory(`/category/${id}`)
            .then(result=>{
                if(result)
                    setCategories(arr)
            })
    };

    const handleChangeInput = (event:React.ChangeEvent<HTMLInputElement>)=>{
      setInputValue(event.target.value)
    };

    const applyInput = ()=>{
      if(inputValue){
          AddCategory('/category',{type:inputValue})
              .then(result=>{
                 if(result === 'Exist'){
                     setError(true);
                     setTimeout(()=>{
                         setError(false)
                     },2000)
                 }
                 else {
                     setShow(false);
                     setCategories([...categories,{id:result.id,type:inputValue}])
                 }
              });
      }
    };

    const categoriesList = ()=>{
        return categories.map((elem:Elem,index) => {
            return (
                <ExpansionPanel
                    key={index}
                    expanded={expanded === elem.type}
                    onChange={handleChange(elem.type)}
                    TransitionProps={{ unmountOnExit: true }}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>{elem.type}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Tooltip title="Delete" aria-label="add">
                            <button className='delete-poll' onClick={()=>deleteCategory(elem.id)}>
                                <DeleteIcon/>
                            </button>
                        </Tooltip>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )
        })
    };

    return (
        <div className={classes.root}>
            {categoriesList()}
            {show &&
                <div style={{
                    display:'flex',
                    justifyContent:'center',
                    flexDirection:'column',
                    alignItems:'center'
                }}
                >
                    <div style={{
                        width:'250px',
                        margin:'0 auto',
                        marginTop:'10px',
                        display:'flex',
                        justifyContent:'center'
                    }}>
                        <input
                            placeholder='Enter category'
                            onChange={handleChangeInput}
                            style={{
                                border:'1px solid #ff9517',
                                height:'20px',
                                borderRadius:'5px'
                            }}/>
                        <Tooltip title="Apply" aria-label="add">
                            <button className='delete-poll'
                                    onClick={applyInput}
                                    style={{
                                        backgroundColor:'rgba(0,0,0,0)',
                                        display:"flex",
                                        justifyContent:'center',
                                        alignItems:'center',
                                        width:'25px',
                                        height:'25px'
                                    }}>
                                <DoneIcon/>
                            </button>
                        </Tooltip>
                        <Tooltip title="Cancel" aria-label="add">
                            <button className='delete-poll'
                                    onClick={()=>setShow(false)}
                                    style={{
                                        backgroundColor:'rgba(0,0,0,0)',
                                        display:"flex",
                                        justifyContent:'center',
                                        alignItems:'center',
                                        width:'25px',
                                        height:'25px'
                                    }}>
                                <ClearIcon/>
                            </button>
                        </Tooltip>
                    </div>
                    {error && <div style={{fontStyle:'italic',marginTop:'5px'}}>Already exist</div>}
                </div>
                    }
            <Tooltip title="Add" aria-label="add">
                <button className='delete-poll'
                        onClick={()=>setShow(true)}
                        style={{
                            marginTop:'10px',
                            marginBottom:'10px',
                            backgroundColor:'#ff9517'
                        }}>
                    <Add/>
                </button>
            </Tooltip>
        </div>
    );
};