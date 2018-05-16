import React, {Component} from 'react';
import UsersStore from "../flux/store/UsersStore";
import {fetchUsers, getUser} from "../flux/actions/usersActions";

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.userId = this.props.params.id;

        this.state = {
            user: null
        };

        this.onUserGet = this.onUserGet.bind(this);
    }

    onUserGet(user) {
        this.setState({
            user
        });
    }

    componentWillMount() {
        UsersStore.on('change-get', this.onUserGet);
    }

    componentDidMount() {
        getUser(this.userId);
    }

    componentWillReceiveProps(nextProps) {
        this.userId = nextProps.params.id;
        getUser(this.userId);
    }

    componentWillUnmount() {
        UsersStore.removeListener('change-get', this.onUserGet);
    }

    render() {
        return (<div>
            <h1>USER PROFILE</h1>
            {this.state.user && <div>
                <p><b>Name:</b> {this.state.user.name}</p>
                <p><b>Surname:</b> {this.state.user.surname}</p>
                <p><b>Email:</b> {this.state.user.email}</p>
            </div>}
        </div>);
    }
}