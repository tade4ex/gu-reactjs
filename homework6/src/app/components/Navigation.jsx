import React, {Component} from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router';
import NavigationItem from "./NavigationItem";

let menuItems = [
    {
        href: '/',
        label: 'Home'
    },
    {
        href: '/posts',
        label: 'Posts'
    },
    {
        href: '/about',
        label: 'About'
    },
    {
        href: '/contacts',
        label: 'Contacts'
    }
];

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 0,
            activeHref: '',
        };
    }

    render() {
        let items = menuItems.map((item, key) => <NavigationItem key={key} href={item.href} label={item.label} />);
        return (
            <Nav pullRight={true} className="nav-pills">{items}</Nav>
        );
    }
}