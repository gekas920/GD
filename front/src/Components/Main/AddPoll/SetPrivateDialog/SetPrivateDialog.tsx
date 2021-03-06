import React, {useEffect, useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import {User} from "../../indexMain";
import SendIcon from "@material-ui/icons/Send";
import './SetPrivateDialog.sass'
import {mapDispatchToProps, mapStateToProps} from "./indexPrivate";
import {connect} from "react-redux";
import {AddUsers} from "./SetPrivateDialogRequests";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: 'theme.palette.background.paper',
            display:'flex',
            justifyContent:'center',
            flexDirection:'column'
        },
    }),
);

const CheckboxList = (props) => {
    const classes = useStyles();
    const [checked, setChecked] = useState([0]);
    const [users,setUsers] = useState<User[]>([{
        initials:'',
        id:''
    }]);
    const [checkboxArray,serArray] = useState([]);

    const handleSubmit = () =>{
        let arr = checked.map((elem)=>{
            return users[elem].id
        });
        props.SetID(arr);
        props.ShowSnack();
    };

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    useEffect(()=>{
        AddUsers('/users/add')
            .then(result=>{
                if(result){
                    setUsers(result);
                    let arr = result.map((elem,index)=>{
                        return index
                    });
                    serArray(arr)
                }
            })
    },[]);

    return (
        <List className={classes.root}>
            <div className='private-header'>Set Private</div>
            {checkboxArray.map((value,index) => {
                const labelId = `${value}`;
                let title = users[index].initials;
                return (
                    <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={1}
                                disableRipple
                                color='primary'
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`${title}`} />
                    </ListItem>
                );
            })}
            <button className='publish-poll'
                    onClick={handleSubmit}
                    style={{width:'150px',height:'40px',marginTop:'10px'}}>
                <SendIcon/>
                Accept
            </button>
        </List>
    );
};
export default connect(mapStateToProps,mapDispatchToProps)(CheckboxList);
