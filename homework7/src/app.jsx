import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {Provider} from 'react-redux';
import store from './app/redux/stores/store';

import Layout from './app/layouts/Layout';
import PostsPage from "./app/pages/PostsPage";
import PostPage from "./app/pages/PostPage";
import AboutPage from "./app/pages/AboutPage";
import ContactsPage from "./app/pages/ContactsPage";
import UsersPage from "./app/pages/UsersPage";
import ProfilePage from "./app/pages/ProfilePage";

const app = document.getElementById('app');

/*
* todo 1 create page access rules
* */

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={PostsPage}/>
                <Route path="posts" component={PostsPage}>
                    <Route path=":page" component={PostsPage}/>
                </Route>
                <Route path="post/:id" component={PostPage}/>
                <Route path="profile/:id" component={ProfilePage}/>
                <Route path="users" component={UsersPage}>
                    <Route path=":page" component={UsersPage}/>
                </Route>
                <Route path="about" component={AboutPage}/>
                <Route path="contacts" component={ContactsPage}/>
            </Route>
        </Router>
    </Provider>, app);