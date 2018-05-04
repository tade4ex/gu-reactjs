import React, {Component} from 'react';
import {Nav, NavItem} from 'react-bootstrap';

export default class Navigation extends Component {
    render() {
        return (
            <Nav pullRight={true} className="nav-pills">
                <NavItem active={true}>Home</NavItem>
                <NavItem>About</NavItem>
                <NavItem>Contact</NavItem>
            </Nav>
        );
    }
};