import React, {Component} from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import {Link} from 'react-router';

import AuthUserStore from '../../flux/store/AuthUserStore';
import {fetchAuthUser} from '../../flux/actions/authUserActions';
import {logout} from '../../flux/actions/authActions';
import SidebarCreateNewUserModal from "./SidebarCreateNewUserModal";
import SidebarCreateNewPostModal from "./SidebarCreateNewPostModal";

export default class SidebarUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            authorization: false,
            modalCreateNewUserShow: false,
            modalCreateNewPostShow: false
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleOpenCloseCreateNewUserModal = this.handleOpenCloseCreateNewUserModal.bind(this);
        this.handleOpenCloseCreateNewPostModal = this.handleOpenCloseCreateNewPostModal.bind(this);
        this.onAuthUserChange = this.onAuthUserChange.bind(this);
    }

    handleLogout() {
        logout();
    }

    handleOpenCloseCreateNewUserModal() {
        this.setState({modalCreateNewUserShow: !this.state.modalCreateNewUserShow});
    }

    handleOpenCloseCreateNewPostModal() {
        this.setState({modalCreateNewPostShow: !this.state.modalCreateNewPostShow});
    }

    onAuthUserChange(user) {
        this.setState({
            user
        });
    }

    componentWillMount() {
        AuthUserStore.on('change', this.onAuthUserChange);
    }

    componentDidMount() {
        fetchAuthUser();
    }

    componentWillUnmount() {
        AuthUserStore.removeListener('change', this.onAuthUserChange);
    }

    render() {
        return (
            <Jumbotron>
                {this.state.user && <div>
                    <h4>Hello, {this.state.user.name}!</h4>
                    <hr/>
                    <ul>
                        {this.state.user.isAdmin === true ? <div>
                            <li><a onClick={this.handleOpenCloseCreateNewUserModal}>add new user</a></li>
                            <li><Link to="/users">view all users</Link></li>
                            <li><a onClick={this.handleOpenCloseCreateNewPostModal}>add new post</a></li>
                        </div> : ''}
                        <li><Link to={`/profile/${this.state.user._id}`}>view profile</Link></li>
                    </ul>
                    <hr/>
                    <Button type="submit" className="btn-default" onClick={this.handleLogout}>Logout</Button>

                    <SidebarCreateNewUserModal modalShow={this.state.modalCreateNewUserShow}
                                               handleCloseModal={this.handleOpenCloseCreateNewUserModal}/>
                    <SidebarCreateNewPostModal user={this.state.user} modalShow={this.state.modalCreateNewPostShow}
                                               handleCloseModal={this.handleOpenCloseCreateNewPostModal}/>
                </div>}
            </Jumbotron>
        );
    }
}