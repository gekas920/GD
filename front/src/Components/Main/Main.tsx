import React, { useEffect,useState } from 'react';
import Requests from "../../Requests";
import './Main.sass'
import {comparePopular, compareUnpopular, Elem, MainProps} from "./indexMain";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Button} from "@material-ui/core";
import Add from '@material-ui/icons/Add'
import Tooltip from "@material-ui/core/Tooltip";
import AssigmentIcon from '@material-ui/icons/Assistant'
import ReportList from "./Reports/ReportList";
import {PollWindow} from "./PollWindow/indexPollWindow";
import {AddPoll} from "./AddPoll/indexAddPoll";


export const Main:React.FC<MainProps> = (props) =>{
    const [data,setData] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [show,setShow] = useState(false);
    const [showRep,setShowReports] = useState(false);


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
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
    useEffect(()=>{
       Requests.get(props.url || '/polls')
           .then((response)=>{
               if(response)
                   setData(response.data)
           })
    },[props.url]);

    const elemArr = data.map((elem:Elem,index)=>{
       return <PollWindow description = {elem.description}
                          count = {elem.count}
                          key = {index}
                          id = {elem.id}
                          link={props.url || ''}
       />
    });

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
            </div>
            }
            <div style={{
                display:'flex',
                alignItems:'center',
                flexDirection:'column',
                marginTop:'5px'
            }}>
                <Button aria-controls="simple-menu"
                        aria-haspopup="true"
                        style={{backgroundColor:'#ff9517'}}
                        onClick={handleClick}>
                    Sort by
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
                <div className='main'>
                    {elemArr}
                </div>
            </div>
        </div>
    );
};
