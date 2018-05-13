import React from 'react';
import ViewPost from "../components/pagePost/ViewPost";
import axios from "axios";

export default class PostsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: undefined
        };
    }

    getPost(postId) {
        console.log('postId', postId);
        axios.get(`/api/post/${postId}`)
            .then((res) => {
                if (res.data == null) {
                    this.setState({
                        post: undefined,
                    });
                    return false;
                }
                this.setState({
                    post: res.data
                });
            })
            .then((err) => {
            });
    }

    componentDidMount() {
        this.getPost(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        this.getPost(nextProps.params.id);
    }

    render() {
        let post = typeof this.state.post === "object" ? <ViewPost {...this.state.post} user={this.props.user} authorization={this.props.authorization}/> : '';
        return (
            <div>
                {post}
            </div>
        );
    }
}