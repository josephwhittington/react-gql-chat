import { LOCALSTORAGE_USER_TOKEN_LOCATION } from "../constants";

export const userAuthenticated = () => {
    return localStorage.getItem(LOCALSTORAGE_USER_TOKEN_LOCATION)
        ? true
        : false;
};
