import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { SvgIcon } from '@mui/material';
import Button from '../Button';import * as actionTypes from "../../redux/actionTypes"
import { connect } from 'react-redux';

function Item(props) {
    const [item, setItems] = useState({});
    const [selectedImage, setSelectedImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [themeObj, setTheme] = useState({});

    // setTheme(them);
    useEffect(() => {
        let theme = createTheme({
            typography: {
                fontFamily: [
                    'Lora'
                ].join(','),
            },
        })
        setTheme(theme)
        let item = props.item;
        var size = Object.keys(item).length;
        if (size > 0) {
            setItems(item);
            setSelectedImage(item.imageUrls[0])
            setLoading(false);
        }
    }, [])
    const addToCart=(itemObj)=>{
        props.add_to_cart({"name":itemObj.name,"itemPic":itemObj.imageUrls[0],"price":itemObj.offerPrice});
    }
    return (
        loading == true ? <div>Item Not Found</div> :
            <div>
                <Layout>
                    <div style={{ display: "flex", marginTop: "2rem" }}>
                        <div className="grid_view">
                            {item.imageUrls.map((url, index) => {
                                return (
                                    <img id={index} onClick={()=>{
                                        setSelectedImage(url);
                                    }} style={{
                                        height: "10rem",
                                        width: "10rem"
                                    }} src={url} alt="image" />
                                )

                            })}
                        </div>
                        <div className="item_wrapper">
                            <div className="item_view">
                                <img src={selectedImage} style={{ height: "80vh" }} alt="image" />
                            </div>
                            <div className="item_details">
                                <ThemeProvider theme={themeObj}>
                                    <Typography variant="h4" gutterBottom>
                                        {item.name}
                                    </Typography>
                                </ThemeProvider>
                                <Button cartFunc={addToCart} item={item}></Button>
                                <Typography variant="button" display="block" gutterBottom></Typography>
                            </div>
                        </div>
                        <div className="add_to_cart">

                        </div>
                        <div className="desctiption">
                            <div className="item_description"></div>
                            <div className="add_to_cart"></div>
                        </div>
                        <div className="reviews">
                            <div className="review">
                                <div className="comment"></div>
                                <div className="rating"></div>
                            </div>
                        </div>
                    </div>
                </Layout >
            </div >

    )
}

const mapStateToProps = (state) => {
    return {
        item:state.item
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        set_item:(obj)=>{
            return dispatch({
                type:actionTypes.SET_ITEM,
                payload:obj
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

export default connect(mapStateToProps,mapDispatchToProps)(Item);
