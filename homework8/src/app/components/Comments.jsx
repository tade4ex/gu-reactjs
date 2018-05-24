import React, {Component} from 'react';

import CommentsStore from "../flux/store/CommentsStore";
import {fetchComments} from "../flux/actions/commentsAction";
import AuthStore from '../flux/store/AuthStore';
import {fetchAuth} from '../flux/actions/authActions';
import AuthUserStore from '../flux/store/AuthUserStore';
import {fetchAuthUser} from '../flux/actions/authUserActions';
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import {getPost} from "../flux/actions/postsActions";

export default class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: null,
            count: 0,
            authorization: false,
            user: null
        };

        this.onComments = this.onComments.bind(this);
        this.onCommentAdd = this.onCommentAdd.bind(this);
        this.onAuth = this.onAuth.bind(this);
        this.onAuthUser = this.onAuthUser.bind(this);
    }

    onComments(comments) {
        this.setState({
            comments: comments.comments,
            count: comments.count,
        });
    }

    onAuth(authorization) {
        this.setState({
            authorization
        });
    }

    onAuthUser(user) {
        this.setState({
            user
        });
    }

    onCommentAdd() {
        fetchComments(this.props.postId);
    }

    componentWillMount() {
        CommentsStore.on('change', this.onComments);
        CommentsStore.on('change-add', this.onCommentAdd);
        AuthStore.on('change', this.onAuth);
        AuthUserStore.on('change', this.onAuthUser);
    }

    componentDidMount() {
        fetchComments(this.props.postId);
        fetchAuth();
        fetchAuthUser();
    }

    componentWillUnmount() {
        CommentsStore.removeListener('change', this.onComments);
        CommentsStore.removeListener('change-add', this.onCommentAdd);
        AuthStore.removeListener('change', this.onAuth);
        AuthUserStore.removeListener('change', this.onAuthUser);
    }

    render() {
        let comments = this.state.comments && this.state.comments.map((comment) => <Comment {...comment} key={comment._id}/>);
        return <div>
            {this.state.authorization === true ? <div>
                <CreateComment user={this.state.user} postId={this.props.postId}/>
                <br/>
            </div> : ''}
            {comments}
        </div>;
    }
}