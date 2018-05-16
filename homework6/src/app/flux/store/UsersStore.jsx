import {EventEmitter} from 'events'
import {
    ADD_USER,
    FETCH_USERS_START,
    FETCH_USERS_END,
    FETCH_USER_ADD,
    GET_USER,
    FETCH_USER_GET
} from "../constants/usersConstants";
import dispatcher from '../dispatcher';
import axios from 'axios';

class UsersStore extends EventEmitter {
    constructor() {
        super(...arguments);

        this.data = {
            users: [],
            lastPage: 0
        };

        this.user = {
            get: null,
            add: null,
            update: null,
            remove: null
        };

        this.fetchUsersStart = this.fetchUsersStart.bind(this);
        this.fetchUsersEnd = this.fetchUsersEnd.bind(this);
        this.addUser = this.addUser.bind(this);
        this.getUser = this.getUser.bind(this);
        this.fetchUserAdd = this.fetchUserAdd.bind(this);
        this.fetchUserGet = this.fetchUserGet.bind(this);

        this.change = this.change.bind(this);
        this.changeGet = this.changeGet.bind(this);
        this.changeAdd = this.changeAdd.bind(this);
        this.changeUpdate = this.changeUpdate.bind(this);
        this.changeRemove = this.changeRemove.bind(this);
        this.handleActions = this.handleActions.bind(this);
    }

    fetchUsersStart(params) {
        let data = {
            users: [],
            lastPage: 0,
            page: 1
        };
        axios.post('/api/users-all', {
            page: params.page,
            limit: params.limitPerPage,
        })
            .then((response) => {
                if (response.data.users != null) {
                    data = response.data;
                }
                dispatcher.dispatch({
                    type: FETCH_USERS_END,
                    payload: data
                });
            });
    }

    fetchUsersEnd(data) {
        this.data = data;
        this.change();
    }

    getUser(userId) {
        axios.get(`/api/user/${userId}`)
            .then((response) => {
                dispatcher.dispatch({
                    type: FETCH_USER_GET,
                    payload: response.data
                });
            });
    }

    addUser(user) {
        axios.post('/api/user-add', {
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: user.password,
        })
            .then((response) => {
                if (response.data.result.ok === true) {
                    dispatcher.dispatch({
                        type: FETCH_USER_ADD,
                        payload: response.data.ops[0]
                    });
                }
                /* todo aler bootstrap this email exists */
                return false;
            });
    }

    fetchUserAdd(user) {
        this.user.add = user;
        this.changeAdd();
    }

    fetchUserGet(user) {
        this.user.get = user;
        this.changeGet();
    }

    change() {
        this.emit('change', this.data);
    }

    changeGet() {
        this.emit('change-get', this.user.get);
    }

    changeAdd() {
        this.emit('change-add', this.user.add);
    }

    changeUpdate() {
        this.emit('change-update', this.user.update);
    }

    changeRemove() {
        this.emit('change-remove', this.user.remove);
    }

    handleActions(action) {
        switch (action.type) {
            case FETCH_USERS_START: {
                this.fetchUsersStart(action.payload);
                break;
            }
            case FETCH_USERS_END: {
                this.fetchUsersEnd(action.payload);
                break;
            }
            case ADD_USER: {
                this.addUser(action.payload);
                break;
            }
            case FETCH_USER_ADD: {
                this.fetchUserAdd(action.payload);
                break;
            }
            case GET_USER: {
                this.getUser(action.payload);
                break;
            }
            case FETCH_USER_GET: {
                this.fetchUserGet(action.payload);
                break;
            }
        }
    }
}

const userStore = new UsersStore;
dispatcher.register(userStore.handleActions);
export default userStore;