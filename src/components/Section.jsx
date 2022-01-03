import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import collection from '..//files/collections.json';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { SvgIcon } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as actionTypes from "../redux/actionTypes"
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';





function Section(props) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [themeObj, setTheme] = useState({});
    let navigate=useNavigate();
   
    useEffect(() => {
        setItems(collection);
        let theme = createTheme({
            typography: {
                fontFamily: [
                    'Lora'
                ].join(','),
            },
        })
        setTheme(theme)
        setItems(collection);
        setLoading(false);
    }, [])
    const setAllItems=()=>{
        // var size = Object.keys(obj).length;
        // console.log(obj);
        // if(size>0){
            props.set_allitems(collection);
            navigate('/allitems');
        // }
    }

    return (
        <div>
            <div>
                <Typography style={{ fontSize: "125%" }} variant="overline" display="block" gutterBottom>
                    Mens Wear
                </Typography>
                <Paper  onClick={()=>{setAllItems()}} className="paper" style={{ width: "10rem" }}><img style={{ width: "inherit" }} src="data:image/jpeg;base64,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" alt="" /></Paper>
            </div>
            {/* <SectionCard></SectionCard> */}
            <Typography style={{ fontSize: "125%" }} variant="overline" display="block" gutterBottom>
                Womens Wear
            </Typography>
            <Typography style={{ fontSize: "125%" }} variant="overline" display="block" gutterBottom>

                Childrens and Kids
            </Typography>

            <Typography style={{ fontSize: "125%" }} variant="overline" display="block" gutterBottom>

                Other Accessories
            </Typography>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        set_allitems:(obj)=>{
            return dispatch({
                type:actionTypes.SET_ALL_ITEMS,
                payload:obj
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Section);
