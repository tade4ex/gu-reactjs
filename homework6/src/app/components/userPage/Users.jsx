import React, {Component} from 'react';
import {Link} from 'react-router';
import {Table} from 'react-bootstrap';

import User from "./User";
import UsersStore from '../../flux/store/UsersStore';
import {fetchUsers} from '../../flux/actions/usersActions';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            lastPage: 0
        };

        this.page = parseInt(this.props.page);
        this.limitPerPage = 5;

        this.onUsersChange = this.onUsersChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.page = parseInt(nextProps.page);
        fetchUsers(this.page, this.limitPerPage);
    }

    onUsersChange(data) {
        this.setState({
            users: data.users,
            lastPage: data.lastPage
        });
    }

    componentWillMount() {
        UsersStore.on('change', this.onUsersChange);
    }

    componentDidMount() {
        fetchUsers(this.page, this.limitPerPage);
    }

    componentWillUnmount() {
        UsersStore.removeListener('change', this.onUsersChange);
    }

    render() {
        let users = this.state.users.map((user) => {
            return <User {...user} key={user._id} />
        });
        return (
            <div>
                <Table striped={true}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{users}</tbody>
                </Table>
                <nav aria-label="">
                    <ul className="pager">
                        {this.page > 1 ? <li className="previous">
                            <Link to={`/users/${this.page - 1}`}><span
                                aria-hidden="true">&larr;</span> Previous</Link>
                        </li> : ''}
                        {this.state.lastPage > this.page ? <li className="next">
                            <Link to={`/users/${this.page + 1}`}>Next <span
                                aria-hidden="true">&rarr;</span></Link>
                        </li> : ''}
                    </ul>
                </nav>
            </div>
        );
    }
}