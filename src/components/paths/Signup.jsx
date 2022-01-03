import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { storage, database } from "../../firebase";
// import TextLink from './Textlink';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import TextLink from './Textlink';
import Identicon from 'identicon';
import { makeStyles } from '@mui/styles';
import { Container, Button, IconButton, Grid, Card, Paper, CardActionArea, CardActions, CardMedia, TextField, Typography } from '@mui/material'
import TextLink from '../TextLink';
import zimFashion from "../../images/zffOriginals.jpeg";
import { useNavigate } from 'react-router-dom';

function Signup(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [profile, setProfile] = useState("");
    // const [file, setFile] = useState(null);
    const { signup } = useContext(AuthContext);
    const navigate=useNavigate();
    // const hiddenFileInput = React.useRef(null);
    // const handleClick = event => {
    //     hiddenFileInput.current.click();
    // };
    // const handlePicChange = (e) => {
    //     console.log("hello");
    //     let file = e?.target?.files[0];
    //     if (file != null) {
    //         console.log(e.target.files[0])
    //         setFile(e.target.files[0]);
    //     }
    // }
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await signup(email, password);
            let uid = res.user.uid;
            let profilePic="";
            Identicon.generate({ id: 'ajido', size: 150 }, (err, buffer) => {
                if (err) throw err
                setProfile(buffer);
                profilePic=buffer;
                // let arr=buffer.split(",");
                // buffer is identicon in PNG format.
                // fs.writeFileSync('/logo.txt',"abcd");
                console.log(buffer);
            });
            // let uploadTaskListner = storage.ref(`/users/${uid}/profileImage`).put(file);
            // uploadTaskListner.on('state_changed', f1, f2, f3);
            // function f1(snapshot) {
            //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //     console.log('Upload is ' + progress + '% done');
            // }
            // function f2(err) {
            //     setError(err);
            // }
            // async function f3() {
            //     let fileUrl = await uploadTaskListner.snapshot.ref.getDownloadURL();
            //     console.log('File available at', fileUrl);
               
            // }
            database.users.doc(uid).set({
                email, password, "name": userName, "userId": uid,"userProfile":profilePic,
                "createdAt": database.getUserTimeStamp(),
                postIds:[]
            })
            setLoading(false);
            navigate('/login');

        } catch (err) {
            // console.log(err);
            setError(err);
            setLoading(false);
        }
    }
    let useStyles = makeStyles({
        container: {
            height: "100vh",
            width: "100vw"
        },
        displayCard: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        },
        cardSize: {
            height: "28rem",
            width: "25rem"
        },
        width: {
            width: "100%",
            padding: "10px", marginBottom: "-10px"
        }
        

    })
    let classes = useStyles();
    return (
        // <Grid container style={{ justifyContent: "center" }} >
            <Grid item xs={8} sm={6} md={4} style={{margin: "0 auto"}}>
                <Card className={classes.cardSize}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="100"
                            image={zimFashion}
                        />
                        <TextField className={classes.width} size="small" id="filled-basic" label="Enter Email" variant="filled" onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                        <TextField id="filled-basic" className={classes.width} label="Password"
                            type="password" size="small" variant="filled" value={password} onChange={(e) => {
                                setPassword(e.target.value);
                            }} />
                        <TextField className={classes.width} size="small" id="filled-basic" label="Full Name" variant="filled" value={userName} onChange={(e) => {
                            setUserName(e.target.value);
                        }} />
                        {/* <input accept="image/*" id="icon-button-file"
                            type="file" style={{ display: 'none' }} ref={hiddenFileInput} onChange={(e) => {
                                handlePicChange(e);
                            }
                            } />
                            */}
{/*                         
                            <IconButton size="small" color="primary" aria-label="Upload" style={{ marginLeft:"5rem",textAlign: "center", paddingTop: "10px" }} onClick={handleClick}>
                                UPLOAD PROFILE IMAGE
                                <CloudUploadIcon color="secondary" style={{ marginTop: "-4px" }}></CloudUploadIcon>
                            </IconButton>
                         */}
                    </CardActionArea>
                    <CardActions className={classes.displayCard}>
                        <Button className={classes.width} color="primary" variant="contained" style={{ margin: "0px" }} onClick={handleSignup}>Sign up</Button>
                        <Typography paragraph={true} variant="overline" display="block" style={{ textAlign: "center" }}>By signing up,you agree to our Terms,Data Policy and Cookies Policy</Typography>
                    </CardActions>
                </Card>
                <Button size="large" style={{ width: "25rem", alignItems: "center" }}>{<div style={{ display: "flex" }}>
                    <TextLink link="/login" text="Have an account?"></TextLink>
                    <TextLink link="/login" text="login"></TextLink>
                </div>}</Button>
            </Grid>
        

    );
}



export default Signup;


