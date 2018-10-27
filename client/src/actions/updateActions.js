import { UPDATE_SET_CHAT_UPDATE } from "../constants";

export const addChatUpdate = chatId => dispatch => {
    console.log("action dispatched");
    dispatch({
        type: UPDATE_SET_CHAT_UPDATE,
        payload: {
            chatId
        }
    });
};
