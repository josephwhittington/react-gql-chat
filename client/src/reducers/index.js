import { combineReducers } from "redux";

import chatReducer from "./chatReducer";

import {
    AUTHENTICATE_USER,
    LOGOUT_USER,
    UPDATE_SET_CHAT_UPDATE
} from "../constants";

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
    },
    chat: chatReducer,
    chatUpdates: (state = [], action) => {
        console.log("reducer running");
        switch (action.type) {
            case UPDATE_SET_CHAT_UPDATE:
                return [...state, action.payload.chatId];
            default:
                return state;
        }
    }
});
