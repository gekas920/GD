import React, {useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps} from "./indexSnack";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function Snack(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.showSnack);

    useEffect(()=>{
        setOpen(props.showSnack);
        setTimeout(()=>{
            props.HideSnack();
        },6000)
    },[props]);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className={classes.root} style={{position:'absolute'}}>
            <Snackbar open={open} onClose={handleClose}
                      autoHideDuration={3000}
                      anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}>
                <Alert onClose={handleClose} severity="success">
                    Success
                </Alert>
            </Snackbar>
        </div>
    );
}
export default connect(mapStateToProps,mapDispatchToProps)(Snack)