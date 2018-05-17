import React, {Component} from 'react';

import SidebarAuthorization from "../components/sidebar/SidebarAuthorization";
import SidebarArchivesCategories from "../components/sidebar/SidebarArchivesCategories";
import SidebarUser from "../components/sidebar/SidebarUser";
import AuthStore from '../flux/store/AuthStore';
import {fetchAuth} from '../flux/actions/authActions';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authorization: false
        };

        this.onAuthChange = this.onAuthChange.bind(this);
    }

    onAuthChange(authorization) {
        this.setState({
            authorization
        });
    }

    componentWillMount()
    {
        AuthStore.on('change', this.onAuthChange);
    }

    componentDidMount()
    {
        fetchAuth();
    }

    componentWillUnmount(){
        AuthStore.removeListener('change', this.onAuthChange);
    }

    render() {
        return (
            <div className="col col-lg-4">
                {this.state.authorization ?
                    <SidebarUser/> :
                    <SidebarAuthorization/>}
                <SidebarArchivesCategories/>
            </div>
        );
    }
}