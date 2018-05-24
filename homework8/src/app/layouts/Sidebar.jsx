import React from 'react';
import {connect} from 'react-redux';
import {Jumbotron} from 'react-bootstrap';

import MasterComponent from "../MasterComponent";
import SidebarAuthorization from "../components/sidebar/SidebarAuthorization";
import SidebarArchivesCategories from "../components/sidebar/SidebarArchivesCategories";
import SidebarUser from "../components/sidebar/SidebarUser";
import {isAuthUser} from '../../app/redux/actions/userActions';

class Sidebar extends MasterComponent {
    constructor() {
        super(...arguments);

        let user = isAuthUser();
        this.props.dispatch(user);
    }

    render() {
        console.log('sidebar', this.props);
        return (
            <div className="col col-lg-4">
                <Jumbotron>
                    {
                        this.props.is_fetching
                            ? this.bubbling()
                            : this.props.authorization ? <SidebarUser/> : <SidebarAuthorization/>
                    }
                </Jumbotron>
                <SidebarArchivesCategories/>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        authorization: store.user.authorization,
        is_fetching: store.user.is_fetching
    };
}

export default connect(mapStateToProps)(Sidebar);