import { CHAT_SET_CURRENT_CHAT_ID } from "../constants";

export const setCurrentChatId = id => dispatch => {
    dispatch({
        type: CHAT_SET_CURRENT_CHAT_ID,
        payload: {
            id
        }
    });
};
