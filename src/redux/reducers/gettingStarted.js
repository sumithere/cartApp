import * as actionTypes from "../actionTypes";
import initialState from "../initialState.json";
export default function gettingStartedReducer(state=initialState.user,action) {
   switch(action.type){
       case actionTypes.SET_USER:
           return action.payload;
   }
}

