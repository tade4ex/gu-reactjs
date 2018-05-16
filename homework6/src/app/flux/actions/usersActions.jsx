import dispacher from '../dispatcher';
import {ADD_USER, FETCH_USERS_START, GET_USER} from "../constants/usersConstants";

export function addUser(name, surname, email, password) {
    let user = {
        name,
        surname,
        email,
        password
    };

    dispacher.dispatch({
        type: ADD_USER,
        payload: user
    });
}

export function getUser(userId) {
    dispacher.dispatch({
        type: GET_USER,
        payload: userId
    });
}

export function fetchUsers(page, limitPerPage) {
    let params = {
        page,
        limitPerPage
    };

    dispacher.dispatch({
        type: FETCH_USERS_START,
        payload: params
    });
}