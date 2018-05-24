import React, {Component} from 'react';
import {Link} from 'react-router';

export default class NavigationItem extends Component {
    constructor(props) {
        super(props);
    }

    isActive(key, href) {
        let _href = window.location.pathname;
        let _href_split = _href.split('/');
        if (_href_split.length > 2) {
            _href = _href_split.slice(0, -1).join('/');
        }
        let active = _href === href;
        return active ? 'active' : '';
    }

    render() {
        return (
            <li key={this.props.key} className={this.isActive(this.props.key, this.props.href)} role="presentation">
                <Link to={this.props.href} role="button">{this.props.label}</Link>
            </li>
        );
    }
}