import React, {Component} from 'react';

export default class User extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <tr>
            <td>{this.props.name}</td>
            <td>{this.props.surname}</td>
            <td>{this.props.email}</td>
            <td>{this.props.isAdmin === true? 'Yes' : 'No'}</td>
        </tr>
    }
}