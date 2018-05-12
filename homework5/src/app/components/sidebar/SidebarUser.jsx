import React, {Component} from 'react';
import axios from 'axios';
import {Jumbotron, Button} from 'react-bootstrap';

export default class SidebarUser extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        axios({
            method: 'get',
            url: '/api/logout',
        }).then(() => {
            this.props.handleAuthorization(false);
        }).then((err) => {});
    }

    render() {
        return (
            <Jumbotron>
                <h4>Hello, {this.props.user.name}!</h4>
                <hr/>
                <ul>
                    <li><a href="#">add new user</a></li>
                    <li><a href="#">view all users</a></li>
                    <li><a href="#">add new post</a></li>
                    <li><a href="#">view all posts</a></li>
                    <li><a href="#">edit profile</a></li>
                </ul>
                <hr/>
                <Button type="submit" className="btn-default" onClick={this.handleLogout}>Logout</Button>
            </Jumbotron>
        );
    }
}