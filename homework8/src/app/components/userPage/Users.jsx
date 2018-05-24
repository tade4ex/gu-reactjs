import React from 'react';
import {Link} from 'react-router';
import {Table} from 'react-bootstrap';
import {connect} from 'react-redux';

import User from "./User";
import {fetchUsers} from "../../redux/actions/usersActions";
import {deleteUser} from "../../redux/actions/userActions";

import MasterComponent from "../../MasterComponent";

class Users extends MasterComponent {
    constructor() {
        super(...arguments);

        this.page = parseInt(this.props.page);
        this.limitPerPage = 5;
        this.changeProps();

        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    handleDeleteUser(userId) {
        let user = deleteUser(userId);
        this.props.dispatch(user);
    }

    changeProps() {
        let users = fetchUsers(this.page, this.limitPerPage);
        this.props.dispatch(users);
    }

    componentWillReceiveProps(nextProps) {
        let propsPage = parseInt(nextProps.page);
        if (this.page !== propsPage) {
            this.page = propsPage;
            this.changeProps();
        }
        if (nextProps.delete_success === 1) {
            this.changeProps();
        }
    }

    render() {
        let users = this.props.users.map((user) => {
            return <User {...user} key={user._id} handleDeleteUser={this.handleDeleteUser}/>
        });
        return (
            <div>
                {
                    this.props.is_fetching
                        ? this.bubbling()
                        : (
                            users.length > 0
                                ?
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
                                : this.alert('danger', 'users not found')
                        )
                }
                <nav aria-label="">
                    <ul className="pager">
                        {this.page > 1 ? <li className="previous">
                            <Link to={`/users/${this.page - 1}`}><span
                                aria-hidden="true">&larr;</span> Previous</Link>
                        </li> : ''}
                        {this.props.lastPage > this.page ? <li className="next">
                            <Link to={`/users/${this.page + 1}`}>Next <span
                                aria-hidden="true">&rarr;</span></Link>
                        </li> : ''}
                    </ul>
                </nav>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        users: store.users.users,
        lastPage: store.users.lastPage,
        is_fetching: store.users.is_fetching,
        delete_success: store.user.delete_success
    };
}

export default connect(mapStateToProps)(Users);