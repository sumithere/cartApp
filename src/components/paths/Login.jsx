import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { Button } from '@mui/material';
import { Container, IconButton, Grid, Card, Paper, CardActionArea, CardActions, CardMedia, TextField, Typography } from '@mui/material'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import { Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import * as actionTypes from "../../redux/actionTypes"
import { connect } from 'react-redux';
import { database } from '../../firebase';
import TextLink from '../TextLink';
import zimFashion from "../../images/zffOriginals.jpeg";


function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    // console.log(AuthContext);
    const obj = useContext(AuthContext);
    const navigate = useNavigate();
    // console.log(props);
    const redirectToHome=()=>{
        navigate('/');
    }
    useEffect(() => {

    }, []);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // console.log(obj);
            let res = await obj.login(email, password);
            console.log(res);
            let uid = res.user.uid;
            console.log(uid);
            let userRef = await database.users.doc(uid).get();
            let user = userRef.data();
            console.log(user);
            props.set_profilepic(user.userProfile);
//ye database se lekar set krna hai
            console.log(res.user);
            setLoading(false);
            navigate('/');
        }
        catch (err) {
            setError(err);
            setLoading(false);
        }
        setEmail("");
        setPassword("");

    }
    let useStyles = makeStyles({
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        crousal: {
            // height: "21rem",
            width: "25rem",
            backgroundColor: "lightGrey"
        },
        cardSize: {
            height: "65vh"
        },
        padding: {

            marginBottom: "10px"

        },
        fitIn: {
            padding: "10px"
        },
        thumbs: {
            height: "50px"
        }
    });
    let classes = useStyles();
    return (
        <>
            {loading == true ? <div>loading...</div> :
                <div style={{
                    height: "100vh",

                }}>
                    <Grid container className={classes.cont} style={{ alignItems: "center", height: "100%", justifyContent: "center" }} >
                        <Grid item xs={8} sm={5} md={5} className={classes.crousal}>
                            <Carousel style={{ backgroundColor: "lightPink" }}>
                                <div style={{}}>
                                    <img className={classes.crousal}
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV_AUcLEwO9NDAwZHX-OQAPFNRdRK-Dtby8Q&usqp=CAU" />
                                    {/* <p className="legend">Legend 1</p> */}
                                </div>
                                <div style={{ height: "100px" }}>
                                    <img className={classes.crousal} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwli79UXcuAzVah3IsKm4odDDcK9bZ03fvIg&usqp=CAU" />
                                    {/* <p className="legend">Legend 2</p> */}
                                </div>
                                <div>
                                    <img className={classes.crousal} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk8lTSVcFa-ZqcBWCEmoR6UA2p78NCTOhFWQ&usqp=CAU" />
                                    {/* <p className="legend">Legend 3</p> */}
                                </div>
                            </Carousel>
                        </Grid>
                        {/* <Grid item xs={8} sm={5} md={5} > */}
                            <Card className={classes.cardSize}>
                                <CardActionArea className={classes.fitIn}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="100"
                                        image={zimFashion}
                                    />
                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} className={classes.padding}>



                                        <TextField style={{ marginBottom: "10px" }} size="small"
                                            id="filled-basic" label="Enter Email" variant="filled" value={email} onChange={(e) => {
                                                setEmail(e.target.value);
                                            }} />
                                        <TextField size="small" className={classes.padding}
                                            id="filled-basic" label="Password" type="password" variant="filled" value={password} onChange={(e) => {
                                                setPassword(e.target.value);
                                            }} />


                                        <TextLink link="/signup" text="Forget Password"></TextLink>
                                    </div>

                                </CardActionArea>
                                <CardActions style={{ display: "flex", flexDirection: "column" }}>
                                    <Button variant="contained" color="primary" style={{ width: "100%" }} onClick={handleLogin}>LOGIN</Button>
                                    <div style={{ display: "flex" }}>
                                        <Button size="small" color="primary" style={{ marginTop: "0px" }}>Dont have a account</Button>
                                        <TextLink link="/signup" text="signup"></TextLink>
                                        <Button onClick={redirectToHome}>Home</Button>

                                    </div>
                                </CardActions>

                            </Card>
                        {/* </Grid> */}

                    </Grid>

                </div>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        userPic:state.userProfile
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        set_profilepic:(buffer)=>{
            return dispatch({
                type:actionTypes.SET_USERPROFILE,
                payload:buffer
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);

