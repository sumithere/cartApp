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


function AllItems(props) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [themeObj, setTheme] = useState({});
    let navigate = useNavigate();
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
        let item = props.allItems;
        var size = item.length;
        if (size > 0) {
            setItems(item);
            setLoading(false);
        }
    }, [])
    const addToCart=(itemObj)=>{
        
        props.add_to_cart({"name":itemObj.name,"itemPic":itemObj.imageUrls[0],"price":itemObj.offerPrice});
    }
    const itemSelected = (obj) => {
        var size = Object.keys(obj).length;
        console.log(obj);
        if (size > 0) {
            props.set_item(obj);
            navigate('/item');
        }
    }
    return (
        loading == true ? <div>Loading...</div> :
            <div>
                <Layout>
                    {items.map((obj, index) => {
                        return (
                            <div id={index} onClick={() => { itemSelected(obj) }}>
                                <div className="item_view">
                                    <img src={obj.imageUrls[0]} style={{ height: "80vh" }} alt="image" />
                                </div>
                                <div className="typo_cart">
                                    <ThemeProvider theme={themeObj}>
                                        <Typography variant="caption" gutterBottom>
                                            {obj.name}
                                        </Typography>
                                    </ThemeProvider>
                                    <div style={{ margin: "0 auto" }}>
                                        <Button cartFunc={addToCart} item={obj}></Button>
                                    </div>
                                    <Typography variant="button" display="block" gutterBottom></Typography>
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
        "allItems": state.allItems
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        set_item: (obj) => {
            return dispatch({
                type: actionTypes.SET_ITEM,
                payload: obj
            })
        },
        add_to_cart:(obj)=>{
            console.log(obj);
            return dispatch({
                type:actionTypes.ADD_TO_CART,
                payload:obj
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllItems);
