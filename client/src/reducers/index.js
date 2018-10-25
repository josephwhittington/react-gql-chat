import { combineReducers } from "redux";

import { AUTHENTICATE_USER, LOGOUT_USER } from "../constants";

export default combineReducers({
    isAuthenticated: (state, action) => {
        switch (action.type) {
            case AUTHENTICATE_USER:
                return true;
            case LOGOUT_USER:
                return false;
            default:
                return false;
        }
    }
});
