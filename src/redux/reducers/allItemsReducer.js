import * as actionTypes from "../actionTypes";
import initialState from "../initialState.json";
export default function allItemsReducer(state=initialState.allItems,action) {
   switch(action.type){
       case actionTypes.SET_ALL_ITEMS:
           return action.payload;
        default:
            return state;
   }
}

