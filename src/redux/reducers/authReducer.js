import * as actionTypes from "../actionTypes";
import initialState from "../initialState.json";
export default function authReducer(state=initialState.auth,action){
    switch(action.type){

        case actionTypes.SIGN_IN_REQUEST:
            return{
                loading:true,
                error:""
            }

        case actionTypes.SIGN_IN_SUCCESS:
            return {
                loading:false,
                error:""
            }
        case actionTypes.SIGN_IN_FAILED:
            return{
                loading:false,
                error:action.payload
            }
        case actionTypes.REMOVE_ERROR:
            return{
                loading:false,
                error:""
            }
        case actionTypes.SIGN_OUT:
            return{
                loading:action.payload,
                error:""
            }
        case actionTypes.SIGN_UP:
            return{
                loading:action.payload,
                error:""
            }

        default:
            return state;
    }
 }