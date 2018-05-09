import React, {Component} from 'react';
import {Form, FormGroup, Button, Modal, ModalHeader, ModalTitle, ModalBody} from 'react-bootstrap';

export default class SidebarRegisterModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputNameOk: false,
            inputNameError: false,
            inputNameErrorMessage: '',
            inputSurnameOk: false,
            inputSurnameError: false,
            inputSurnameErrorMessage: '',
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

        this.handleRegisterForm = this.handleRegisterForm.bind(this);
        this.inputNameChange = this.inputNameChange.bind(this);
        this.inputSurnameChange = this.inputSurnameChange.bind(this);
        this.inputEmailChange = this.inputEmailChange.bind(this);
        this.inputPasswordChange = this.inputPasswordChange.bind(this);
        this.inputRepeatPasswordChange = this.inputRepeatPasswordChange.bind(this);
    }

    handleRegisterForm() {
        if (

            this.state.inputNameOk &&
            this.state.inputSurnameOk &&
            this.state.inputEmailOk &&
            this.state.inputPasswordOk &&
            this.state.inputRepeatPasswordOk

        ) {
            alert('registration success!!!');
        }
    }

    inputNameChange(e) {
        if ((e.type === 'change' && this.state.inputNameError === true) || e.type === 'blur') {
            let isError = false;
            let errorMessage = '';
            if (e.target.value.length < 3) {
                isError = true;
                errorMessage = 'Name must min 3 symbols!';
            }
            this.setState({
                inputNameOk: !isError,
                inputNameError: isError,
                inputNameErrorMessage: errorMessage
            });
        }
    }

    inputSurnameChange(e) {
        if ((e.type === 'change' && this.state.inputSurnameError === true) || e.type === 'blur') {
            let isError = false;
            let errorMessage = '';
            if (e.target.value.length < 3) {
                isError = true;
                errorMessage = 'Name must min 3 symbols!';
            }
            this.setState({
                inputSurnameOk: !isError,
                inputSurnameError: isError,
                inputSurnameErrorMessage: errorMessage
            });
        }
    }

    inputEmailChange(e) {
        if ((e.type === 'change' && this.state.inputEmailError === true) || e.type === 'blur') {
            let value = e.target.value;
            let isError = false;
            let errorMessage = '';
            if (value === '') {
                isError = true;
                errorMessage = 'Email must by required!';
            } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
                isError = true;
                errorMessage = 'Email incorrect, example test@test.com!';
            }
            this.setState({
                inputEmailOk: !isError,
                inputEmailError: isError,
                inputEmailErrorMessage: errorMessage
            });
        }
    }

    inputPasswordChange(e) {
        let value = e.target.value;
        this.setState({inputPasswordValue: value});
        if ((e.type === 'change' && this.state.inputPasswordError === true) || e.type === 'blur') {
            let isError = false;
            let errorMessage = '';
            if (value.length < 6) {
                isError = true;
                errorMessage = 'Name must min 6 symbols!';
            }
            this.setState({
                inputPasswordOk: !isError,
                inputPasswordError: isError,
                inputPasswordErrorMessage: errorMessage
            });
        }
    }

    inputRepeatPasswordChange(e) {
        let value = e.target.value;
        this.setState({inputRepeatPasswordValue: value});
        if ((e.type === 'change' && this.state.inputRepeatPasswordError === true) || e.type === 'blur') {
            let isError = false;
            let errorMessage = '';
            if (value.length < 6) {
                isError = true;
                errorMessage = 'Name must min 6 symbols!';
            } else if (value !== this.state.inputPasswordValue) {
                isError = true;
                errorMessage = 'Passwords not equals!';
            }
            this.setState({
                inputRepeatPasswordOk: !isError,
                inputRepeatPasswordError: isError,
                inputRepeatPasswordErrorMessage: errorMessage
            });
        }
    }

    render() {
        return (
            <div>
                <Modal show={this.props.modalShow} onHide={this.props.handleCloseRegisterModal}>
                    <ModalHeader closeButton>
                        <ModalTitle>Register</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup className={(this.state.inputNameError ? 'has-error' : '')}>
                                <label htmlFor="inputName">Name:</label>
                                <input type="text" className="form-control" id="inputName"
                                       placeholder="Name" aria-describedby="inputNameHelpBox"
                                       onBlur={this.inputNameChange} onChange={this.inputNameChange}/>
                                <span id="inputNameHelpBox"
                                      className="help-block">{(this.state.inputNameError ? this.state.inputNameErrorMessage : '')}</span>
                            </FormGroup>
                            <FormGroup className={(this.state.inputSurnameError ? 'has-error' : '')}>
                                <label htmlFor="inputSurname">Surname:</label>
                                <input type="text" className="form-control" id="inputSurname"
                                       placeholder="Surname" aria-describedby="inputSurnameHelpBox"
                                       onBlur={this.inputSurnameChange}
                                       onChange={this.inputSurnameChange}/>
                                <span id="inputSurnameHelpBox"
                                      className="help-block">{(this.state.inputSurnameError ? this.state.inputSurnameErrorMessage : '')}</span>
                            </FormGroup>
                            <FormGroup className={(this.state.inputEmailError ? 'has-error' : '')}>
                                <label htmlFor="inputEmail">Email address:</label>
                                <input type="email" className="form-control" id="inputEmail"
                                       placeholder="Email address" aria-describedby="inputEmailHelpBox"
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
                            <Button type="submit" className="btn-primary"
                                    onClick={this.handleRegisterForm}>Register</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}