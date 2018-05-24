import React from 'react';
import {Form, FormGroup, Button, Modal, ModalHeader, ModalTitle, ModalBody} from 'react-bootstrap';
import { browserHistory } from 'react-router';

import PostsStore from '../../flux/store/PostsStore';
import {addPost} from '../../flux/actions/postsActions';
import FormComponent from "../../FormComponent";

export default class SidebarCreateNewPostModal extends FormComponent {
    constructor(props) {
        super(props);

        this.defaultStates = {
            inputTitleValue: '',
            inputTitleOk: false,
            inputTitleError: false,
            inputTitleErrorMessage: '',
            inputShortTextValue: '',
            inputShortTextOk: false,
            inputShortTextError: false,
            inputShortTextErrorMessage: '',
            inputLongTextValue: '',
            inputLongTextOk: false,
            inputLongTextError: false,
            inputLongTextErrorMessage: ''
        };

        this.state = JSON.parse(JSON.stringify(this.defaultStates));

        this.handleSendForm = this.handleSendForm.bind(this);
        this.inputTitleChange = this.inputTitleChange.bind(this);
        this.inputShortTextChange = this.inputShortTextChange.bind(this);
        this.inputLongTextChange = this.inputLongTextChange.bind(this);
        this.onPostAdd = this.onPostAdd.bind(this);
    }

    handleSendForm() {
        if (
            this.state.inputTitleOk &&
            this.state.inputShortTextOk &&
            this.state.inputLongTextOk
        ) {
            addPost(this.getDateTime(), null, {
                title: this.state.inputTitleValue,
                shortText: this.state.inputShortTextValue,
                longText: this.state.inputLongTextValue
            },{
                title: `${this.props.user.name} ${this.props.user.surname}`,
                _id: this.props.user._id
            }, 0);
        }
        return false;
    }

    inputTitleChange(e) {
        this.checkInput(e, 'inputTitle', {
            len: {
                len: 5,
                errorMessage: 'Name must min 5 symbols!'
            }
        });
    }

    inputShortTextChange(e) {
        this.checkInput(e, 'inputShortText', {
            len: {
                len: 10,
                errorMessage: 'Name must min 10 symbols!'
            }
        });
    }

    inputLongTextChange(e) {
        this.checkInput(e, 'inputLongText', {
            len: {
                len: 30,
                errorMessage: 'Name must min 30 symbols!'
            }
        });
    }

    onPostAdd(post) {
        this.props.handleCloseModal();
        this.setState(this.defaultStates);
        browserHistory.push(`/post/${post._id}`);
    }

    componentWillMount() {
        PostsStore.on('change-add', this.onPostAdd);
    }

    componentWillUnmount() {
        PostsStore.removeListener('change-add', this.onPostAdd);
    }

    render() {
        return (
            <div>

                <Modal show={this.props.modalShow} onHide={this.props.handleCloseModal}>
                    <ModalHeader closeButton>
                        <ModalTitle>Create new post</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <Form type="post">
                            <FormGroup className={(this.state.inputTitleError ? 'has-error' : '')}>
                                <label htmlFor="inputTitle">Title:</label>
                                <input type="text" className="form-control" id="inputTitle"
                                       placeholder="Title" aria-describedby="inputTitleHelpBox"
                                       value={this.state.inputTitleValue}
                                       onBlur={this.inputTitleChange} onChange={this.inputTitleChange}/>
                                <span id="inputTitleHelpBox"
                                      className="help-block">{(this.state.inputTitleError ? this.state.inputTitleErrorMessage : '')}</span>
                            </FormGroup>
                            <FormGroup className={(this.state.inputShortTextError ? 'has-error' : '')}>
                                <label htmlFor="inputShortText">Short text:</label>
                                <textarea className="form-control" id="inputShortText" rows="3" placeholder="Short text"
                                          aria-describedby="inputShortTextHelpBox"
                                          onBlur={this.inputShortTextChange}
                                          onChange={this.inputShortTextChange}
                                          value={this.state.inputShortTextValue}
                                />
                                <span id="inputShortTextHelpBox"
                                      className="help-block">{(this.state.inputShortTextError ? this.state.inputShortTextErrorMessage : '')}</span>
                            </FormGroup>
                            <FormGroup className={(this.state.inputLongTextError ? 'has-error' : '')}>
                                <label htmlFor="inputLongText">Long text:</label>
                                <textarea className="form-control" id="inputShortText" rows="10" placeholder="Long text"
                                          aria-describedby="inputShortTextHelpBox"
                                          onBlur={this.inputLongTextChange}
                                          onChange={this.inputLongTextChange}
                                          value={this.state.inputLongTextValue}
                                />
                                <span id="inputShortTextHelpBox"
                                      className="help-block">{(this.state.inputLongTextError ? this.state.inputLongTextErrorMessage : '')}</span>
                            </FormGroup>
                            <Button className="btn-primary"
                                    onClick={this.handleSendForm}>Add</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}