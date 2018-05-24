import dispacher from '../dispatcher';
import {FETCH_AUTH_USER_START} from "../constants/authUserConstants";

export function fetchAuthUser() {
    setTimeout(function() {
        dispacher.dispatch({
            type: FETCH_AUTH_USER_START
        });
    }, 1);
}