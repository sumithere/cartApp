import * as actionTypes from "../actionTypes";
import initialState from "../initialState.json";
export default function userProfileReducer(state = initialState.userProfile, action) {
    switch (action.type) {
        case actionTypes.SET_USERPROFILE:
            return action.payload;
        case actionTypes.REMOVE_USERPROFILE:
            return action.payload;
        default:
            return state;
    }
}

