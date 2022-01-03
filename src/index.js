import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Carousal from './Carousal';
import reportWebVitals from './reportWebVitals';
import store from "./redux/store";
import {Provider} from "react-redux";
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider, } from 'react-redux-firebase';
import firebaseConfig from "./secrets";
import firebase from "firebase/compat/app";

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
  <ReactReduxFirebaseProvider
        firebase={firebase}
        config={firebaseConfig}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
    <App />
    </ReactReduxFirebaseProvider>
    </Provider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
