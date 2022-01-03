import {combineReducers} from "redux";
// import ContactReducer from './contactReducer';
// import DocumentReducer from "./documentReducer";
// import EducationReducer from "./educationReducer";
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
// import gettingStartedReducer from "./gettingStarted";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import userProfileReducer from "./userProfileReducer";
import itemReducer from "./itemReducer";
import allItemsReducer from "./allItemsReducer";

const rootReducer=combineReducers({
    cart:cartReducer,
    user:userReducer,
    item:itemReducer,
    allItems:allItemsReducer,
    userProfile:userProfileReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer
});
export default rootReducer;