import dispacher from '../dispatcher';
import {AUTH_CHECK_USER, AUTH_LOGOUT, FETCH_AUTH_START} from "../constants/authConstants";

export function authCheckUser(email, password) {
    const user = {
        email,
        password
    };

    dispacher.dispatch({
        type: AUTH_CHECK_USER,
        payload: user
    });
}

export function logout() {
    dispacher.dispatch({
        type: AUTH_LOGOUT
    });
}

export function fetchAuth() {
    setTimeout(() => {
        dispacher.dispatch({
            type: FETCH_AUTH_START
        });
    }, 1);
}