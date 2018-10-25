import {
    AUTHENTICATE_USER,
    LOCALSTORAGE_USER_TOKEN_LOCATION,
    ERROR_INCORRECT_USERNAME_OR_PASSWORD
} from "../constants";

export const authenticateUser = ({ username, password }, login) => dispatch => {
    console.log(username, password);
    login()
        .then(data => {
            const { authenticateUser: authData } = data.data;
            setUserToken(authData.token);
            console.log("authData", authData);
        })
        .catch(err => {
            console.log("err", err);
            handleAuthError(err);
        });
    dispatch({
        type: AUTHENTICATE_USER
    });
};

export const authenticateUserIfTokenExists = () => dispatch => {
    if (localStorage.getItem(LOCALSTORAGE_USER_TOKEN_LOCATION)) {
        dispatch({
            type: AUTHENTICATE_USER
        });
    }
};

export const logout = () => {};

function setUserToken(token) {
    if (!token) {
        console.log("token not set");
    } else {
        localStorage.setItem(LOCALSTORAGE_USER_TOKEN_LOCATION, token);
    }
}

function handleAuthError(error) {
    switch (error) {
        case ERROR_INCORRECT_USERNAME_OR_PASSWORD:
            console.log("wrong username or password");
            break;
        default:
            return;
    }
}
