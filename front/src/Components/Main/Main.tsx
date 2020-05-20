import React, { useEffect,useState } from 'react';
import Requests from "../../Requests";
import './Main.sass'
import PollWindow from "./PollWindow/PollWindow";
import {comparePopular, compareUnpopular, Elem} from "./indexMain";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Button} from "@material-ui/core";
import Add from '@material-ui/icons/Add'
import AddPoll from "./AddPoll/AddPoll";


const Main = () =>{
    const [data,setData] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [show,setShow] = useState(false);


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
       Requests.get('/polls')
           .then((response)=>{
               if(response)
                   setData(response.data)
           })
    },[]);

    const elemArr = data.map((elem:Elem,index)=>{
       return <PollWindow description = {elem.description}
                          count = {elem.count}
                          key = {index}
                          id = {elem.id}
       />
    });

    return (
        <div>
            <div>
                <button className='back-btn' onClick={()=>setShow(prevState => !prevState)}>
                    <Add/>
                </button>
                {show && <AddPoll/>}
            </div>
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
export default Main
