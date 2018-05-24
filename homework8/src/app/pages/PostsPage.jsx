import React from 'react';
import Posts from "../components/pagePost/Posts";

export default class PostsPage extends React.Component
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
            <Posts page={this.state.page} user={this.props.user}/>
        );
    }
}