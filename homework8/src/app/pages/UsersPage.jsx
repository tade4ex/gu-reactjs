import React from 'react';

import Users from "../components/userPage/Users";
import MasterComponent from "../MasterComponent";

export default class UsersPage extends MasterComponent
{
    constructor(props) {
        super(props);
        this.state = {
            page: this.props.params.page || 1
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            page: nextProps.params.page || 1
        });
    }

    render(){
        return (
            <Users page={this.state.page}/>
        );
    }
}