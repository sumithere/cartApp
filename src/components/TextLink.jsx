
import React, { useEffect, useState, useContext } from 'react';
import { NavLink, BrowserRouter as Router } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Button } from '@mui/material';


function TextLink(props) {
    const history = useNavigate();
    const [state,setState] = useState(false);
    let useStyles = makeStyles({
        margin: {
            marginBottom: "-30px", textAlign: "center"
        }
    })
    // let pushHistory=()=>{
    //     history.push(`/${props.link}`);
    // }
    const callFunc=()=>{
        setState(true);
    }
    let classes = useStyles();
    return (<>
    {state==true?<Navigate to={props.link}></Navigate>:
    
        <Typography variant="overline" display="block" className={classes.margin}>
            <Button onClick={()=>{
                callFunc();
            }} >{props.text}</Button>
        </Typography>
    }
    </>
    )
}

export default TextLink;