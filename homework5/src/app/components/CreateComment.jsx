import React from 'react';
import axios from 'axios';
import {Form, FormGroup, Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';

import FormComponent from "./FormComponent";

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
    }

    handleSendForm() {
        if (this.state.inputCommentOk) {
            axios.post('/api/comment-add', {
                userId: this.props.user._id,
                postId: this.props.postId,
                userTitle: `${this.props.user.name} ${this.props.user.surname}`,
                comment: this.state.inputCommentValue,
                createDateTime: this.getDateTime()
            }).then((result) => {
                if (result.data.result.ok === 1) {
                    this.setState(this.defaultStates);
                    browserHistory.push(`/post/${this.props.postId}`);
                }
                /* todo alert error ... */
                return false;
            }).then((err) => {});
        }
    }

    inputCommentChange(e) {
        this.checkInput(e, 'inputComment', {
            len: {
                len: 10,
                errorMessage: 'Name must min 10 symbols!'
            }
        });
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