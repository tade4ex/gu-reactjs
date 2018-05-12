import React, {Component} from 'react';
import Posts from "./Posts";

export default class Content extends Component {
    render() {
        return (
            <div className="col col-lg-8">
                <Posts/>
            </div>
        );
    }
}