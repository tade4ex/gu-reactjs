import * as UsersConstants from '../constants/usersConstants';

export function usersReducer(state = {
    users: [], is_fetching: false, lastPage: 0
}, action) {
    switch (action.type) {
        case UsersConstants.FETCH_USER_PENDING: {
            state = {...state, is_fetching: false};
            break;
        }

        case UsersConstants.FETCH_USERS_FULFILLED: {
            state = {...state, is_fetching: true, users: action.payload.data.users, lastPage: action.payload.data.lastPage};
            break;
        }

        case UsersConstants.FETCH_USERS_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}