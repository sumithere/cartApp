import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import collection from '../../files/collections.json';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { SvgIcon } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from '../Button';
import * as actionTypes from "../../redux/actionTypes"
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Cart(props) {
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
        if(props.cart.length>0){
            setTheme(theme)
            setItems(props.cart);
            setLoading(false);
        }
       
    }, [])
    // props.add_to_cart({"name":item.name,"itemPic":item.imageUrls[0],"price":item.offerPrice});
    
    return (
        loading == true ? <div>Loading...</div> :
            <div>
                <Layout>
                    {items.map((obj,index)=>{
                        return( 
                        <div id={index} >
                            <div className="item_view">
                                <img src={obj.itemPic} style={{ height: "80vh" }} alt="image" />
                            </div>
                            <div className="typo_cart">
                                <ThemeProvider theme={themeObj}>
                                    <Typography variant="caption" gutterBottom>
                                        {obj.name}
                                    </Typography>
                                </ThemeProvider>
                                <ThemeProvider theme={themeObj}>
                                    <Typography variant="caption" gutterBottom>
                                        {obj.price}
                                    </Typography>
                                </ThemeProvider>
                            </div>
                        </div>
                           )
                        })}
                </Layout >
            </div >

    )
}

const mapStateToProps = (state) => {
    return {
        cart:state.cart
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);
