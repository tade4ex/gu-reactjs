import React, {Component} from 'react';
import {Nav, NavItem} from 'react-bootstrap';

let menuItems = [
    {
        href: '#',
        label: 'Home',
        active: true
    },
    {
        href: '#',
        label: 'About',
        active: false
    },
    {
        href: '#',
        label: 'Contact',
        active: false
    }
];

export default class Navigation extends Component {
    render() {
        let items = menuItems.map((item, key) => <NavItem active={item.active} href={item.href} key={key}>{item.label}</NavItem>);
        return (
            <Nav pullRight={true} className="nav-pills">{items}</Nav>
        );
    }
}