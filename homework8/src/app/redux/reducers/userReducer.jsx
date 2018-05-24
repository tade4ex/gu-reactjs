import * as UserConstants from '../constants/userConstants';

export function userReducer(state = {
    error_message: null,
    edit_success: false,
    success: false,
    user: null
}, action) {
    state.success = false;
    state.edit_success = false;
    state.delete_success = false;
    switch (action.type) {
        /* add user */
        case UserConstants.ADD_USER_PENDING: {
            state = {...state, add_is_fetching: true, user: null, success: false};
            break;
        }
        case UserConstants.ADD_USER_FULFILLED: {
            state = {...state, add_is_fetching: false, user: action.payload.data.ops[0], success: action.payload.data.result.ok};
            break;
        }
        case UserConstants.ADD_USER_REJECTED: {
            state = {...state, add_is_fetching: false, error_message: action.payload.message, success: false};
            break;
        }
        /* edit user */
        case UserConstants.UPDATE_USER_PENDING: {
            state = {...state, edit_is_fetching: true, user: null, edit_success: false};
            break;
        }
        case UserConstants.UPDATE_USER_FULFILLED: {
            state = {...state, edit_is_fetching: false, user: null, edit_success: action.payload.data.ok};
            break;
        }
        case UserConstants.UPDATE_USER_REJECTED: {
            state = {...state, edit_is_fetching: false, error_message: action.payload.message, edit_success: false};
            break;
        }
        /* delete user */
        case UserConstants.DELETE_USER_PENDING: {
            state = {...state, edit_is_fetching: true, delete_success: false};
            break;
        }
        case UserConstants.DELETE_USER_FULFILLED: {
            state = {...state, edit_is_fetching: false, delete_success: action.payload.data.ok};
            break;
        }
        case UserConstants.DELETE_USER_REJECTED: {
            state = {...state, edit_is_fetching: false, error_message: action.payload.message, delete_success: false};
            break;
        }
        /* get user */
        case UserConstants.GET_USER_PENDING: {
            state = {...state, get_is_fetching: true, user: null};
            break;
        }
        case UserConstants.GET_USER_FULFILLED: {
            state = {...state, get_is_fetching: false, user: action.payload.data, edit_success: false};
            break;
        }
        case UserConstants.GET_USER_REJECTED: {
            state = {...state, get_is_fetching: false, error_message: action.payload.message};
            break;
        }
        /* is auth user */
        case UserConstants.IS_AUTH_USER_PENDING: {
            state = {...state, is_fetching: true, authorization: false};
            break;
        }
        case UserConstants.IS_AUTH_USER_FULFILLED: {
            state = {...state, is_fetching: false, authorization: action.payload.data};
            break;
        }
        case UserConstants.IS_AUTH_USER_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
        /* auth user */
        case UserConstants.AUTH_USER_PENDING: {
            state = {...state, is_fetching: true, authorization: false};
            break;
        }
        case UserConstants.AUTH_USER_FULFILLED: {
            state = {...state, is_fetching: false, authorization: action.payload.data};
            break;
        }
        case UserConstants.AUTH_USER_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
        /* logout user */
        case UserConstants.LOGOUT_USER_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }
        case UserConstants.LOGOUT_USER_FULFILLED: {
            state = {...state, is_fetching: false, authorization: false};
            break;
        }
        case UserConstants.LOGOUT_USER_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}