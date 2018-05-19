import axios from  'axios';

import {FETCH_USERS} from "../constants/usersConstants";

export function fetchUsers(page, limit) {
    let url = `/api/users-all`;
    return {
        type: FETCH_USERS,
        payload: axios.post(url, {page, limit})
    }
}