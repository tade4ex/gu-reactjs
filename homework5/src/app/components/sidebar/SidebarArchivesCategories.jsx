import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

let archiveItems = [
    {
        href: '#',
        title: 'April 2018',
        count: 12
    },
    {
        href: '#',
        title: 'March 2018',
        count: 7
    },
    {
        href: '#',
        title: 'February 2018',
        count: 18
    },
    {
        href: '#',
        title: 'January 2018',
        count: 4
    },
    {
        href: '#',
        title: 'December 2017',
        count: 23
    },
    {
        href: '#',
        title: 'November 2017',
        count: 1
    }
];

export default class SidebarArchivesCategories extends Component {
    render() {
        let archives = archiveItems.map((item, key) => <ListGroupItem key={key} href={item.href}><span
            className="badge">{item.count}</span>{item.title}</ListGroupItem>);
        return (
            <div className="sidebar-module">
                <h3>Archives</h3>
                <ListGroup>
                    {archives}
                </ListGroup>
            </div>
        );
    }
}