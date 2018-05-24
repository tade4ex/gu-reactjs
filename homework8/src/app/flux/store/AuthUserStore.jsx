import {EventEmitter} from 'events'
import {FETCH_AUTH_USER_START, FETCH_AUTH_USER_END} from "../constants/authUserConstants";
import dispatcher from '../dispatcher';
import axios from 'axios';

class AuthUserStore extends EventEmitter {
    constructor() {
        super(...arguments);

        this.user = null;

        this.fetchAuthUserStart = this.fetchAuthUserStart.bind(this);
        this.fetchAuthUserEnd = this.fetchAuthUserEnd.bind(this);
        this.change = this.change.bind(this);
        this.handleActions = this.handleActions.bind(this);
    }

    fetchAuthUserStart() {
        axios.get(`/api/authorization_user`)
            .then((response) => {
                dispatcher.dispatch({
                    type: FETCH_AUTH_USER_END,
                    payload: response.data
                });
            });
    }

    fetchAuthUserEnd(user) {
        this.user = user;
        this.change();
    }

    change() {
        this.emit('change', this.user);
    }

    handleActions(action) {
        switch (action.type) {
            case FETCH_AUTH_USER_START: {
                this.fetchAuthUserStart();
                break;
            }
            case FETCH_AUTH_USER_END: {
                this.fetchAuthUserEnd(action.payload);
                break;
            }
        }
    }
}

const authUserStore = new AuthUserStore;
dispatcher.register(authUserStore.handleActions);
export default authUserStore;