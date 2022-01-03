import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { BrowserRouter as Router, Navigate,Outlet,Route, Routes, Link } from "react-router-dom";
import { connect } from 'react-redux';


function PrivateRoute({children,...props}){
    // const Component=props.abc;
    // let {currentUser}=useContext(AuthContext);
    console.log(props)
    let currentUser=props.user;
    // return(<Route {...props} render={
    //   (props)=>{
          return (currentUser!=null?children:<Navigate to="/login "></Navigate>)
    //   }
    // } ></Route>)
    // return currentUser!=null?<Outlet></Outlet>:<Navigate to="/login "></Navigate>
  
  }
  
const mapStateToProps=(state)=>{
    return {
      user:state.user
    }
  }
  

  
  export default connect(mapStateToProps)(PrivateRoute);
  
  
  
  
  