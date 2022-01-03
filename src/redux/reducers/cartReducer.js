import * as actionTypes from "../actionTypes";
import initialState from "../initialState.json";
export default function cartReducer(state=initialState.cart,action) {
   switch(action.type){
       case actionTypes.ADD_TO_CART:
           return [...state,action.payload];
        default:
            return state;
   }
}

