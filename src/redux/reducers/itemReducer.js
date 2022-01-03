import * as actionTypes from "../actionTypes";
import initialState from "../initialState.json";
export default function itemReducer(state=initialState.item,action) {
   switch(action.type){
       case actionTypes.SET_ITEM:
           return action.payload;
        default:
            return state;
   }
}

