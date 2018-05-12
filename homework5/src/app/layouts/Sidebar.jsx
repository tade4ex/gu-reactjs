import React, {Component} from 'react';
import SidebarAuthorization from "../components/sidebar/SidebarAuthorization";
import SidebarArchivesCategories from "../components/sidebar/SidebarArchivesCategories";
import SidebarUser from "../components/sidebar/SidebarUser";

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col col-lg-4">
                {this.props.authorization ?
                    <SidebarUser user={this.props.user} handleAuthorization={this.props.handleAuthorization}/> :
                    <SidebarAuthorization handleAuthorization={this.props.handleAuthorization}/>}
                <SidebarArchivesCategories/>
            </div>
        );
    }
}