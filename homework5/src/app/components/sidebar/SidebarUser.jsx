import React, {Component} from 'react';
import axios from 'axios';
import {Jumbotron, Button} from 'react-bootstrap';
import {Link} from 'react-router';

import SidebarCreateNewUserModal from "./SidebarCreateNewUserModal";
import SidebarCreateNewPostModal from "./SidebarCreateNewPostModal";

export default class SidebarUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalCreateNewUserShow: false,
            modalCreateNewPostShow: false
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleOpenCloseCreateNewUserModal = this.handleOpenCloseCreateNewUserModal.bind(this);
        this.handleOpenCloseCreateNewPostModal = this.handleOpenCloseCreateNewPostModal.bind(this);
    }

    handleLogout() {
        axios({
            method: 'get',
            url: '/api/logout',
        }).then(() => {
            this.props.handleAuthorization(false);
        }).then((err) => {});
    }

    handleOpenCloseCreateNewUserModal() {
        this.setState({modalCreateNewUserShow: !this.state.modalCreateNewUserShow});
    }

    handleOpenCloseCreateNewPostModal() {
        this.setState({modalCreateNewPostShow: !this.state.modalCreateNewPostShow});
    }

    render() {
        return (
            <Jumbotron>
                <h4>Hello, {this.props.user.name}!</h4>
                <hr/>
                <ul>
                    {this.props.user.isAdmin === true ? <div>
                        <li><a onClick={this.handleOpenCloseCreateNewUserModal}>add new user</a></li>
                        <li><Link to="/users">view all users</Link></li>
                        <li><a onClick={this.handleOpenCloseCreateNewPostModal}>add new post</a></li>
                    </div> : ''}
                    <li><a href="#">edit profile</a></li>
                </ul>
                <hr/>
                <Button type="submit" className="btn-default" onClick={this.handleLogout}>Logout</Button>

                <SidebarCreateNewUserModal modalShow={this.state.modalCreateNewUserShow} handleCloseModal={this.handleOpenCloseCreateNewUserModal}/>
                <SidebarCreateNewPostModal user={this.props.user} modalShow={this.state.modalCreateNewPostShow} handleCloseModal={this.handleOpenCloseCreateNewPostModal}/>
            </Jumbotron>
        );
    }
}