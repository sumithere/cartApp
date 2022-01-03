import React, { useState, useRef, useEffect, useContext } from 'react';
import NavBar from '../NavBar';
import { AuthContext } from '../../context/AuthContext';
import Identicon from 'identicon';
import { connect } from 'react-redux';
import * as actionTypes from "../../redux/actionTypes"

function Profile(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { signout } = useContext(AuthContext);
    const [profile,setProfile] = useState("");

    console.log(props);
    useEffect(()=>{
        // Identicon.generate({ id: 'ajido', size: 150 }, (err, buffer) => {
        //     if (err) throw err
        //     setProfile(buffer);
        //     // let arr=buffer.split(",");
        //     // props.update_profilepic(buffer);
        //     // buffer is identicon in PNG format.
        //     // fs.writeFileSync('/logo.txt',"abcd");
        //     console.log(props);
        // });
    },[])
    const handleSignout = async (e) => {
        try {
            setLoading(true);
            await signout();
            props.remove_profilepic();
            setLoading(false);
        }
        catch (err) {
            setError(err);
            setLoading(false);
        }
    }
    return (
        loading==true?<>Loading....</>:
        <div>
            <NavBar src={props.userPic} handleSignout={handleSignout}></NavBar>
        </div>
    )
}


const mapStateToProps=(state)=>{
    return {
        "userPic":state.userProfile
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        remove_profilepic:()=>{
            dispatch({
                type:actionTypes.REMOVE_USERPROFILE,
                payload:""
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
