import React from 'react';
import axios from 'axios';
import {Form, FormGroup, Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';

import FormComponent from "../FormComponent";
import {addComment, fetchComments} from "../flux/actions/commentsAction";
import AuthUserStore from "../flux/store/AuthUserStore";
import {fetchAuth} from "../flux/actions/authActions";
import CommentsStore from "../flux/store/CommentsStore";
import AuthStore from "../flux/store/AuthStore";
import {fetchAuthUser} from "../flux/actions/authUserActions";

export default class CreateComment extends FormComponent {
    constructor(props) {
        super(props);
        this.defaultStates = {
            inputCommentError: false,
            inputCommentOk: false,
            inputCommentValue: '',
            inputCommentErrorMessage: '',
        };

        this.state = JSON.parse(JSON.stringify(this.defaultStates));

        this.handleSendForm = this.handleSendForm.bind(this);
        this.inputCommentChange = this.inputCommentChange.bind(this);
        this.onCommentAdd = this.onCommentAdd.bind(this);
    }

    handleSendForm() {
        if (this.state.inputCommentOk) {
            addComment(this.props.user._id, this.props.postId, `${this.props.user.name} ${this.props.user.surname}`, this.state.inputCommentValue, this.getDateTime());
        }
    }

    inputCommentChange(e) {
        this.checkInput(e, 'inputComment', {
            len: {
                len: 2,
                errorMessage: 'Name must min 2 symbols!'
            }
        });
    }

    onCommentAdd() {
        this.setState(this.defaultStates);
        browserHistory.push(`/post/${this.props.postId}`);
    }

    componentWillMount() {
        CommentsStore.on('change-add', this.onCommentAdd);
    }

    componentWillUnmount() {
        CommentsStore.removeListener('change-add', this.onCommentAdd);
    }

    render() {
        return <Form>
            <FormGroup className={(this.state.inputCommentError ? 'has-error' : '')}>
                <label htmlFor="inputComment">Comment:</label>
                <textarea className="form-control" id="inputComment" rows="3" placeholder="Comment"
                          aria-describedby="inputCommentHelpBox"
                          onBlur={this.inputCommentChange}
                          onChange={this.inputCommentChange}
                          value={this.state.inputCommentValue}
                />
                <span id="inputCommentHelpBox"
                      className="help-block">{(this.state.inputCommentError ? this.state.inputCommentErrorMessage : '')}</span>
            </FormGroup>
            <Button className="btn-success" onClick={this.handleSendForm}>Send</Button>
        </Form>;
    }
}