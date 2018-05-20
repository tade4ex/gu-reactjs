import React from 'react';
import {Form, FormGroup, Button, Modal, ModalHeader, ModalTitle, ModalBody} from 'react-bootstrap';
import {browserHistory} from "react-router";
import {connect} from 'react-redux';

import FormComponent from "../FormComponent";
import {addUser} from '../../redux/actions/userActions';

class SidebarCreateNewUserModal extends FormComponent {
    constructor() {
        super(...arguments);

        this.state = {
            inputNameValue: '',
            inputNameOk: false,
            inputNameError: false,
            inputNameErrorMessage: '',
            inputSurnameValue: '',
            inputSurnameOk: false,
            inputSurnameError: false,
            inputSurnameErrorMessage: '',
            inputEmailValue: '',
            inputEmailOk: false,
            inputEmailError: false,
            inputEmailErrorMessage: '',
            inputPasswordValue: '',
            inputPasswordOk: false,
            inputPasswordError: false,
            inputPasswordErrorMessage: '',
            inputRepeatPasswordValue: '',
            inputRepeatPasswordOk: false,
            inputRepeatPasswordError: false,
            inputRepeatPasswordErrorMessage: ''
        };

        this.newUserRedirect = false;

        this.handleRegisterForm = this.handleRegisterForm.bind(this);
        this.inputNameChange = this.inputNameChange.bind(this);
        this.inputSurnameChange = this.inputSurnameChange.bind(this);
        this.inputEmailChange = this.inputEmailChange.bind(this);
        this.inputPasswordChange = this.inputPasswordChange.bind(this);
        this.inputRepeatPasswordChange = this.inputRepeatPasswordChange.bind(this);
        this.userAddSuccess = this.userAddSuccess.bind(this);
    }

    handleRegisterForm() {
        if (
            this.state.inputNameOk &&
            this.state.inputSurnameOk &&
            this.state.inputEmailOk &&
            this.state.inputPasswordOk &&
            this.state.inputRepeatPasswordOk
        ) {
            let user = addUser(this.state.inputNameValue, this.state.inputSurnameValue, this.state.inputEmailValue, this.state.inputPasswordValue);
            this.props.dispatch(user);
        }
        return false;
    }

    inputNameChange(e) {
        this.checkInput(e, 'inputName', {
            len: {
                len: 3,
                errorMessage: 'Name must min 3 symbols!'
            }
        });
    }

    inputSurnameChange(e) {
        this.checkInput(e, 'inputSurname', {
            len: {
                len: 3,
                errorMessage: 'Name must min 3 symbols!'
            }
        });
    }

    inputEmailChange(e) {
        this.checkInput(e, 'inputEmail', {
            regexp: {
                regexp: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
                errorMessage: 'Email incorrect, example test@test.com!'
            }
        });
    }

    inputPasswordChange(e) {
        this.checkInput(e, 'inputPassword', {
            len: {
                len: 3,
                errorMessage: 'Name must min 3 symbols!'
            }
        });
    }

    inputRepeatPasswordChange(e) {
        this.checkInput(e, 'inputRepeatPassword', {
            len: {
                len: 3,
                errorMessage: 'Name must min 3 symbols!'
            },
            anotherValue: {
                name: 'inputPassword',
                operation: '!==',
                errorMessage: 'Passwords not equals!'
            }
        });
    }

    userAddSuccess() {
        if (this.props.user != null && !this.newUserRedirect) {
            let _id = this.props.user._id;
            if (_id != null) {
                this.newUserRedirect = true;
                this.props.handleCloseModal();
                this.setState(this.defaultStates);
                browserHistory.push(`/profile/${_id}`);
            }
        }
    }

    render() {
        return (
            <div>
                <Modal show={this.props.modalShow} onHide={this.props.handleCloseModal}>
                    <ModalHeader closeButton>
                        <ModalTitle>Create new user</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <Form type="post">
                            <FormGroup className={(this.state.inputNameError ? 'has-error' : '')}>
                                <label htmlFor="inputName">Name:</label>
                                <input type="text" className="form-control" id="inputName"
                                       placeholder="Name" aria-describedby="inputNameHelpBox"
                                       value={this.state.inputNameValue}
                                       onBlur={this.inputNameChange} onChange={this.inputNameChange}/>
                                <span id="inputNameHelpBox"
                                      className="help-block">{(this.state.inputNameError ? this.state.inputNameErrorMessage : '')}</span>
                            </FormGroup>
                            <FormGroup className={(this.state.inputSurnameError ? 'has-error' : '')}>
                                <label htmlFor="inputSurname">Surname:</label>
                                <input type="text" className="form-control" id="inputSurname"
                                       placeholder="Surname" aria-describedby="inputSurnameHelpBox"
                                       value={this.state.inputSurnameValue}
                                       onBlur={this.inputSurnameChange}
                                       onChange={this.inputSurnameChange}/>
                                <span id="inputSurnameHelpBox"
                                      className="help-block">{(this.state.inputSurnameError ? this.state.inputSurnameErrorMessage : '')}</span>
                            </FormGroup>
                            <FormGroup className={(this.state.inputEmailError ? 'has-error' : '')}>
                                <label htmlFor="inputEmail">Email address:</label>
                                <input type="email" className="form-control" id="inputEmail"
                                       placeholder="Email address" aria-describedby="inputEmailHelpBox"
                                       value={this.state.inputEmailValue}
                                       onBlur={this.inputEmailChange} onChange={this.inputEmailChange}/>
                                <span id="inputEmailHelpBox"
                                      className="help-block">{(this.state.inputEmailError ? this.state.inputEmailErrorMessage : '')}</span>
                            </FormGroup>
                            <FormGroup className={(this.state.inputPasswordError ? 'has-error' : '')}>
                                <label htmlFor="inputPassword">Password:</label>
                                <input type="password" className="form-control" id="inputPassword"
                                       placeholder="Password" value={this.state.inputPasswordValue}
                                       aria-describedby="inputPasswordHelpBox"
                                       onBlur={this.inputPasswordChange} onChange={this.inputPasswordChange}/>
                                <span id="inputPasswordHelpBox"
                                      className="help-block">{(this.state.inputPasswordError ? this.state.inputPasswordErrorMessage : '')}</span>
                            </FormGroup>
                            <FormGroup className={(this.state.inputRepeatPasswordError ? 'has-error' : '')}>
                                <label htmlFor="inputRepeatPassword">Repeat password:</label>
                                <input type="password" className="form-control" id="inputRepeatPassword"
                                       placeholder="Repeat password" value={this.state.inputRepeatPasswordValue}
                                       aria-describedby="inputRepeatPasswordHelpBox"
                                       onBlur={this.inputRepeatPasswordChange}
                                       onChange={this.inputRepeatPasswordChange}/>
                                <span id="inputRepeatPasswordHelpBox"
                                      className="help-block">{(this.state.inputRepeatPasswordError ? this.state.inputRepeatPasswordErrorMessage : '')}</span>
                            </FormGroup>
                            {
                                this.props.add_is_fetching
                                    ? this.bubbling()
                                    : <Button className="btn-primary"
                                             onClick={this.handleRegisterForm}>Add</Button>
                            }
                            {
                                /* todo alert... */
                                this.props.success
                                    ? this.userAddSuccess() : ''
                            }
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        user: store.user.user,
        success: store.user.success,
        lastPage: store.user.lastPage,
        add_is_fetching: store.user.add_is_fetching
    };
}

export default connect(mapStateToProps)(SidebarCreateNewUserModal);