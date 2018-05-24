import { createStore, combineReducers, applyMiddleware } from 'redux';

import logger from 'redux-logger';
import promise from 'redux-promise-middleware';

//Reducers
import { usersReducer } from '../reducers/usersReducer';
import { userReducer } from '../reducers/userReducer';

const reducers = combineReducers({
    users: usersReducer,
    user: userReducer
});

const middleware = applyMiddleware(promise(), logger());

const store = createStore(reducers, middleware);
export default store;