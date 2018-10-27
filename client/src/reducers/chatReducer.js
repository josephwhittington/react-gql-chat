import { CHAT_SET_CURRENT_CHAT_ID } from "../constants";

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case CHAT_SET_CURRENT_CHAT_ID:
            return {
                ...state,
                currentChatId: action.payload.id
            };
        default:
            return state;
    }
}
