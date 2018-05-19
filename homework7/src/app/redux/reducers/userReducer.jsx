import * as UserConstants from '../constants/userConstants';

export function userReducer(state = {error_message: null}, action) {
    switch (action.type) {
        /* add user */
        case UserConstants.ADD_USER_PENDING: {
            state = {...state, add_is_fetching: true, user: null, success: false};
            break;
        }
        case UserConstants.ADD_USER_FULFILLED: {
            state = {...state, add_is_fetching: false, user: action.payload.data, success: action.payload.data.success};
            break;
        }
        case UserConstants.ADD_USER_REJECTED: {
            state = {...state, add_is_fetching: false, error_message: action.payload.message, success: false};
            break;
        }
        /* get user */
        case UserConstants.GET_USER_PENDING: {
            state = {...state, get_is_fetching: true, user: null};
            break;
        }
        case UserConstants.GET_USER_FULFILLED: {
            state = {...state, get_is_fetching: false, user: action.payload.data};
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