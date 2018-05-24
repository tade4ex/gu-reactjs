import React, {Component} from 'react';
import {Link} from 'react-router';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    handleDeleteUser() {
        this.props.handleDeleteUser(this.props._id);
    }

    render() {
        return <tr>
            <td>{this.props.name}</td>
            <td>{this.props.surname}</td>
            <td>{this.props.email}</td>
            <td>{this.props.isAdmin === true? 'Yes' : 'No'}</td>
            <td className="btn-group" role="group">
                <Link className="btn btn-default" to={`/profile/${this.props._id}`}>view</Link>
                <Link className="btn btn-primary" to={`/profile/edit/${this.props._id}`}>edit</Link>
                <Link className="btn btn-danger" onClick={this.handleDeleteUser}>delete</Link>
            </td>
        </tr>
    }
}