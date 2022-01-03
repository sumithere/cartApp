import * as actionTypes from "../actionTypes";
import initialState from "../initialState.json";
export default function userReducer(state=initialState.user,action) {
   switch(action.type){
       case actionTypes.UPDATE_USER:
           return action.payload;
        default:
            return state;
   }
}

