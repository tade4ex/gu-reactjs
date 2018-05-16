import React, {Component} from 'react';
import axios from 'axios';
import Comment from "./Comment";
import CreateComment from "./CreateComment";

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        };
    }

    getComments() {
        axios.post('/api/comments-all', {
            postId: this.props.postId
        }).then((result) => {
            this.setState({
                comments: result.data.data
            });
        }).then((err) => {});
    }

    componentDidMount() {
        this.getComments();
    }

    componentWillReceiveProps() {
        this.getComments();
    }

    render() {
        let comments = this.state.comments.map((comment) => <Comment {...comment} key={comment._id}/>);
        return <div>
            {this.props.authorization === true ? <div>
                <CreateComment user={this.props.user} postId={this.props.postId}/>
                <br/>
            </div> : ''}
            {comments}
        </div>;
    }
}