import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {Table} from 'react-bootstrap';
import User from "./User";

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            lastPage: 0
        };

        this.page = parseInt(this.props.page);
        this.limitPerPage = 5;
    }

    getUsers() {
        axios.post('/api/users-all', {
            page: this.page,
            limit: this.limitPerPage,
        })
            .then((res) => {
                if (res.data.data == null) {
                    this.setState({
                        users: [],
                        lastPage: 0
                    });
                    return false;
                }
                this.setState({
                    users: res.data.data,
                    lastPage: res.data.lastPage
                });
            })
            .then((err) => {
            });
    }

    componentDidMount() {
        this.getUsers();
    }

    componentWillReceiveProps(nextProps) {
        this.page = parseInt(nextProps.page);
        this.getUsers();
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