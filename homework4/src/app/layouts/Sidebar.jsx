import React, {Component} from 'react';
import SidebarAuthorization from "../components/sidebar/SidebarAuthorization";
import SidebarArchivesCategories from "../components/sidebar/SidebarArchivesCategories";

export default class Sidebar extends Component {
    render() {
        return (
            <div className="col col-lg-4">
                <SidebarAuthorization/>
                <SidebarArchivesCategories/>
            </div>
        );
    }
}