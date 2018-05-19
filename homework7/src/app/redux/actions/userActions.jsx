import axios from 'axios';

import {AUTH_USER, IS_AUTH_USER, GET_USER, ADD_USER, UPDATE_USER, DELETE_USER, LOGOUT_USER} from '../constants/userConstants';

export function authUser(email, password) {
    let url = `/api/authorization`;
    return {
        type: AUTH_USER,
        payload: axios.post(url, {
            email,
            password
        })
    };
}

export function isAuthUser() {
    let url = `/api/authorization`;
    return {
        type: IS_AUTH_USER,
        payload: axios.get(url)
    };
}

export function getUser(id) {
    let url = `/api/user/${id}`;
    return {
        type: GET_USER,
        payload: axios.get(url)
    };
}

export function addUser(name, surname, email, password) {
    let url = `/api/user-add`;
    return {
        type: ADD_USER,
        payload: axios.post(url, {...arguments})
    };
}

export function updateUser(id, name, surname, email, password) {
    let url = `/api/user-update`;
    return {
        type: UPDATE_USER,
        payload: axios.post(url, {...arguments})
    };
}

export function deleteUser(id) {
    let url = `/api/user-delete`;
    return {
        type: DELETE_USER,
        payload: axios.post(url, {id})
    };
}

export function logoutUser() {
    let url = `/api/logout`;
    return {
        type: LOGOUT_USER,
        payload: axios.get(url)
    }
}