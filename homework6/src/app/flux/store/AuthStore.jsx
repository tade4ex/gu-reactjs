import {EventEmitter} from 'events'
import {AUTH_CHECK_USER, AUTH_LOGOUT, FETCH_AUTH_START, FETCH_AUTH_END} from "../constants/authConstants";
import dispatcher from '../dispatcher';
import axios from 'axios';

class AuthStore extends EventEmitter {
    constructor() {
        super(...arguments);

        this.authorization = false;

        this.fetchAuthStart = this.fetchAuthStart.bind(this);
        this.fetchAuthEnd = this.fetchAuthEnd.bind(this);
        this.change = this.change.bind(this);
        this.handleActions = this.handleActions.bind(this);
    }

    fetchAuthStart() {
        axios.get(`/api/authorization`)
            .then((response) => {
                dispatcher.dispatch({
                    type: FETCH_AUTH_END,
                    payload: response.data.authorization
                });
            });
    }

    fetchAuthEnd(authorization) {
        this.authorization = authorization;
        this.change();
    }

    checkUser(user) {
        axios.post(`/api/authorization`, {
            email: user.email,
            password: user.password
        }).then((response) => {
            dispatcher.dispatch({
                type: FETCH_AUTH_END,
                payload: response.data.authorization
            });
        });
    }

    logout() {
        axios.get(`/api/logout`)
            .then(() => {
                this.authorization = false;
                this.change();
            })
    }

    change() {
        this.emit('change', this.authorization);
        console.log('test');
    }

    handleActions(action) {
        switch (action.type) {
            case AUTH_CHECK_USER: {
                this.checkUser(action.payload);
                break;
            }
            case FETCH_AUTH_START: {
                this.fetchAuthStart();
                break;
            }
            case FETCH_AUTH_END: {
                this.fetchAuthEnd(action.payload);
                break;
            }
            case AUTH_LOGOUT: {
                this.logout();
                break;
            }
        }
    }
}

const authStore = new AuthStore;
dispatcher.register(authStore.handleActions);
export default authStore;