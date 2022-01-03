import React, { useState, useEffect } from "react";
import auth from "../firebase";
import * as taskActions from "../redux/actionTypes";
import { connect } from "react-redux";
import { database } from "../firebase";
// import { createContext } from "react";
// import { SettingsInputSvideoRounded } from "@material-ui/icons";
export const AuthContext = React.createContext();
function AuthProvider({ children, ...props }) {
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    // console.log(props);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            authUser ? props.updateUser(authUser) : props.updateUser(null)
            if (authUser != null) {

                let uid = authUser.uid;
                console.log(uid);
                let userRef = await database.users.doc(uid).get();
                let user = userRef.data();
                console.log(user);
                props.set_profilepic(user.userProfile);
            }

        })
        return function () {
            return unsubscribe;
        }
    })
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }
    function signout() {
        return auth.signOut();
    }
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    let value = {
        login, signout, signup
    }
    // console.log(value);
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
const mapStateToProps = (state) => {
    return {
        loggedInUser: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => {
            return dispatch({
                type: taskActions.UPDATE_USER,
                payload: user
            })
        },
        set_profilepic: (pic) => {
            dispatch({
                type: taskActions.SET_USERPROFILE,
                payload: pic
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);
