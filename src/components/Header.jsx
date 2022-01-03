import React, { useState, useEffect } from 'react';
// import profileImage from "../images/";
import myntra from "../images/zimFashionIcon.jpeg";
import Overlay from './Overlay';
import Avatar from '@mui/material/Avatar';
// import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header(props) {
    const [clas, setClas] = useState("is-hidden");
    const navigate=useNavigate();
    useEffect(
        ()=>{},[]);
    const redirectToProfile=()=>{
        navigate('/profile');
    }
    const redirectToCart=()=>{
        navigate('/cart');
    }
    return (<div>
        <div className="header flex-items">
            <div className="flex-items options" onMouseOver={(e) => {
                let tar = e.target.closest(".header-buttons");
                if (tar == null) {
                    return;
                }
                e.target.style.backgroundColor = "Orange";
                setClas("");
            }} onMouseOut={(e) => {
                // let tar=e.relatedTarget;
                e.target.style.backgroundColor = "";
                let tar = e.target.closest(".header-buttons");
                if (tar == null) {
                    return;
                } else {
                    setClas("is-hidden");
                }
                // if(!tar.closest(".options")){
                // }
            }}>
                <img height="40px" src={myntra}></img>
                <div className="header-buttons">Collections</div>
                <div className="header-buttons">Men</div>
                <div className="header-buttons">Women</div>
                <div className="header-buttons">About</div>
                <div className="header-buttons">Contract</div>
            </div>
            <div className="flex-items profile-icons">
                <div style={{
                    display: "flex"
                }}>
                    <input type="search" style={{
                        height: "inherit",
                        width: "16rem"
                    }} />
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <div  className="search_icon" style={{width:"3rem",paddingTop: "3px"}}>
                    {/* <SearchIcon className="search_icon" ></SearchIcon> */}
                    <i style={{
                        marginTop: "2.5px"
                        , borderWidth: "1px",
                    }}class="fa fa-search fa-lg" aria-hidden="true"></i>
                    </div>
                </div>
                <Avatar onClick={redirectToProfile} sx={{ width: 32, height: 32 }} src={props.userPic} alt="hello" />
                <i onClick={redirectToCart} class="fa fa-shopping-cart fa-2x"></i>
            </div>
        </div>
        <Overlay clas={clas}></Overlay>

    </div>

    )
}
const mapStateToProps=(state)=>{
    return {
        userPic:state.userProfile
    }
}


export default connect(mapStateToProps)(Header);
