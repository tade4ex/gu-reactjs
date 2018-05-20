import React from 'react';
import {connect} from 'react-redux';

import MasterComponent from "../MasterComponent";
import {getUser} from '../../app/redux/actions/userActions';

class ProfilePage extends MasterComponent {
    constructor() {
        super(...arguments);
        this.userId = this.props.params.id;
        this.changeProps();
    }

    changeProps() {
        let user = getUser(this.userId);
        this.props.dispatch(user);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.id !== this.userId) {
            this.userId = nextProps.params.id;
            this.changeProps();
        }
    }

    render() {
        return (<div>
            <h1>USER PROFILE</h1>
            {
                this.props.get_is_fetching
                    ? this.bubbling()
                    : (
                        this.props.user == null
                            ? this.alert('danger', 'user not find')
                            : <div>
                                <p><b>Name:</b> {this.props.user.name}</p>
                                <p><b>Surname:</b> {this.props.user.surname}</p>
                                <p><b>Email:</b> {this.props.user.email}</p>
                            </div>
                    )
            }
        </div>);
    }
}

function mapStateToProps(store) {
    return {
        user: store.user.user,
        get_is_fetching: store.user.get_is_fetching
    };
}

export default connect(mapStateToProps)(ProfilePage);