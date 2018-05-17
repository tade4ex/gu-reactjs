import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';

export default class Comment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Panel>
            <div className="panel-heading">{this.props.userTitle} <i>{this.props.createDateTime}</i></div>
            <div className="panel-body">{this.props.comment}</div>
        </Panel>;
    }
}