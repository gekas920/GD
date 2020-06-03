import React, { useEffect,useState } from 'react';
import './Main.sass'
import {comparePopular, compareUnpopular, Elem, MainProps} from "./indexMain";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Button, Dialog} from "@material-ui/core";
import Add from '@material-ui/icons/Add'
import Tooltip from "@material-ui/core/Tooltip";
import AssigmentIcon from '@material-ui/icons/Assistant'
import ListIcon from '@material-ui/icons/List'
import ReportList from "./Reports/ReportList";
import {PollWindow} from "./PollWindow/indexPollWindow";
import {AddPoll} from "./AddPoll/indexAddPoll";
import {MainGet} from "./MainRequests";
import {CategoriesList} from "./Categories/indexCategories";


export const Main:React.FC<MainProps> = (props) =>{
    const [data,setData] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorCat, setAnchorCat] = React.useState<null | HTMLElement>(null);
    const [show,setShow] = useState(false);
    const [showRep,setShowReports] = useState(false);
    const [open,setOpen] = useState(false);
    const [categories,setCategories] = useState([]);


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClickCat = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorCat(event.currentTarget);
    };


    const menuClick = (props?:number) => {
        switch (props) {
            case 1:
                setData(data.sort(comparePopular));
                break;
            case 2:
                setData(data.sort(compareUnpopular));
                break;
        }
        setAnchorEl(null);
    };
    const menuClickCat = (id?:string) => {
        if(id !=='0')
            MainGet(`/category/${id}`)
                .then(result=>{
                    if(result)
                        setData(result)
                });
        if(id === '0')
            MainGet(props.url || '/polls')
                .then((result)=>{
                    if(result)
                        setData(result)
                });
        setAnchorCat(null);
    };
    useEffect(()=>{
       MainGet(props.url || '/polls')
           .then((result)=>{
               if(result)
                   setData(result)
           });
        MainGet('/categories')
            .then((result)=>{
                if(result){
                    setCategories(result)
                }
            })
    },[props.url]);

    const getCategories = ()=>{
        if(categories){
            return categories.map((elem:{type:string,id:string},index)=>{
                return (
                    <MenuItem key = {index} onClick={()=>menuClickCat(elem.id)}>{elem.type}</MenuItem>
                )
            })
        }
    };

    const elemArr = !!data ? data.map((elem:Elem,index)=>{
       return <PollWindow description = {elem.description}
                          count = {elem.count}
                          key = {index}
                          id = {elem.id}
                          link={props.url || ''}
       />
    }) : [];

    return (
        <div>
            {window.location.pathname !== '/main/my' &&
            <div>
                <Tooltip title="Add" aria-label="add">
                    <button className='back-btn' onClick={()=>setShow(prevState => !prevState)}>
                        <Add/>
                    </button>
                </Tooltip>
                {show && <AddPoll/>}
            </div>}
            {window.location.pathname !=='/main/my' && props.admin &&
            <div>
                <Tooltip title="Reports" aria-label="add">
                    <button className='back-btn'
                            onClick={()=>setShowReports(prevState => !prevState)}
                            style={{
                        marginTop:'49vh'
                    }}>
                        <AssigmentIcon/>
                    </button>
                </Tooltip>
                {showRep && <ReportList/>}
                <Dialog open={open} onClose={()=>setOpen(false)}>
                    <CategoriesList/>
                </Dialog>
                <Tooltip title="Categories" aria-label="add">
                    <button className='back-btn'
                            onClick={()=>setOpen(true)}
                            style={{
                                marginTop:'55vh'
                            }}>
                        <ListIcon/>
                    </button>
                </Tooltip>
            </div>
            }
            <div style={{
                display:'flex',
                alignItems:'center',
                flexDirection:'column',
                marginTop:'5px'
            }}>
                <div>
                    <Button aria-controls="simple-menu"
                            aria-haspopup="true"
                            style={{backgroundColor:'#ff9517'}}
                            onClick={handleClick}>
                        Sort by
                    </Button>
                    <Button aria-controls="categories-menu"
                            aria-haspopup="true"
                            style={{backgroundColor:'#ff9517',marginLeft:'5px'}}
                            onClick={handleClickCat}>
                        SELECT CATEGORY
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={()=>menuClick()}
                    >
                        <MenuItem onClick={()=>menuClick(1)}>Most popular</MenuItem>
                        <MenuItem onClick={()=>menuClick(2)}>Most unpopular</MenuItem>
                    </Menu>
                    <Menu
                        id="categories-menu"
                        anchorEl={anchorCat}
                        keepMounted
                        open={Boolean(anchorCat)}
                        onClose={()=>menuClickCat()}
                    >
                        {getCategories()}
                        <MenuItem onClick={()=>menuClickCat('0')}>Clear</MenuItem>
                    </Menu>
                </div>
                <div className='main'>
                    {elemArr}
                </div>
            </div>
        </div>
    );
};
