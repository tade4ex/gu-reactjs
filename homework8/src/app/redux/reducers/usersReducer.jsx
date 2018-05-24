import * as UsersConstants from '../constants/usersConstants';

export function usersReducer(state = {
    users: [], is_fetching: false, lastPage: 0
}, action) {
    switch (action.type) {
        case UsersConstants.FETCH_USERS_PENDING: {
            state = {...state, is_fetching: true};
            break;
        }

        case UsersConstants.FETCH_USERS_FULFILLED: {
            state = {...state, is_fetching: false, users: action.payload.data.users, lastPage: action.payload.data.lastPage};
            break;
        }

        case UsersConstants.FETCH_USERS_REJECTED: {
            state = {...state, is_fetching: false, error_message: action.payload.message};
            break;
        }
    }
    return state;
}