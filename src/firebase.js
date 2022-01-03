import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
let object = require("./secrets");
firebase.initializeApp(object);
let auth = firebase.auth();
export const firestore=firebase.firestore();
export default auth;
export const provider = new firebase.auth.GoogleAuthProvider()
export const storage=firebase.storage();
export const database={
    collections: firestore.collection("collections"),
    users: firestore.collection("users"),
    reviews:firestore.collection("reviews"),
    getUserTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}