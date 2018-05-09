import React, {Component} from 'react';
import '../styles/Header.css';
import Navigation from "../components/Navigation";

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header clearfix">
                <Navigation/>
                <h3 className="text-muted">{this.props.projectName}</h3>
            </div>
        );
    }
}