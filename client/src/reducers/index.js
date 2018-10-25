import { combineReducers } from "redux";

import { AUTHENTICATE_USER } from "../constants";

export default combineReducers({
    isAuthenticated: (state, action) => {
        switch (action.type) {
            case AUTHENTICATE_USER:
                return true;
            default:
                return false;
        }
    }
});
