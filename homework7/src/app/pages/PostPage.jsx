import React, {Component} from 'react';

import ViewPost from "../components/pagePost/ViewPost";
import PostsStore from "../flux/store/PostsStore";
import {getPost} from "../flux/actions/postsActions";

export default class PostsPage extends Component {
    constructor(props) {
        super(props);

        this.postId = this.props.params.id;

        this.state = {
            post: null
        };

        this.onPostGet = this.onPostGet.bind(this);
    }

    onPostGet(post) {
        this.setState({
            post
        });
    }

    componentWillMount() {
        PostsStore.on('change-get', this.onPostGet);
    }

    componentDidMount() {
        getPost(this.postId);
    }

    componentWillReceiveProps(nextProps) {
        this.postId = nextProps.params.id;
        getPost(this.postId);
    }

    componentWillUnmount() {
        PostsStore.removeListener('change-get', this.onPostGet);
    }

    render() {
        return (
            <div>
                {this.state.post &&
                <ViewPost {...this.state.post} user={this.props.user} authorization={this.props.authorization}/>}
            </div>
        );
    }
}