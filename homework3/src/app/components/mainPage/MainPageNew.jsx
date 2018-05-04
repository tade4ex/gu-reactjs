import React, {Component} from 'react';

export default class MainPageNew extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-6">
                <h4>{this.props.title}</h4>
                <p>{this.props.description}</p>
            </div>
        );
    }
};