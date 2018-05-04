import React, {Component} from 'react';
import {Jumbotron, Button, Modal, Form, FormGroup} from 'react-bootstrap';

export default class MainPageJumbotron extends Component {
    constructor(props) {
        super(props);

        this.handleShowLoginModal = this.handleShowLoginModal.bind(this);
        this.handleCloseLoginModal = this.handleCloseLoginModal.bind(this);

        this.handleShowRegisterModal = this.handleShowRegisterModal.bind(this);
        this.handleCloseRegisterModal = this.handleCloseRegisterModal.bind(this);


        this.state = {
            loginModalShow: false,
            registerModalShow: false,
        };
    }

    handleCloseLoginModal() {
        this.setState({ loginModalShow: false });
    }

    handleShowLoginModal() {
        this.setState({ loginModalShow: true });
    }

    handleCloseRegisterModal() {
        this.setState({ registerModalShow: false });
    }

    handleShowRegisterModal() {
        this.setState({ registerModalShow: true });
    }

    render() {
        return (
            <Jumbotron>
                <h1>{this.props.title}</h1>
                <p className="lead">{this.props.lead}</p>
                <p>
                    <Button className="btn-lg btn-success" onClick={this.handleShowLoginModal}>Login</Button>
                    {' '}
                    <Button className="btn-lg btn-primary" onClick={this.handleShowRegisterModal}>Register</Button>
                </p>
                <Modal show={this.state.loginModalShow} onHide={this.handleCloseLoginModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormGroup>
                                <label for="login_form-login">Login:</label>
                                <input type="text" className="form-control" placeholder="Login" id="login_form-login"/>
                            </FormGroup>

                            <FormGroup>
                                <label for="login_form-password">Password:</label>
                                <input type="text" className="form-control" placeholder="Password" id="login_form-password"/>
                            </FormGroup>

                            <Button className="btn btn-success">Login</Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.registerModalShow} onHide={this.handleCloseRegisterModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormGroup>
                                <label for="register_form-login">Login:</label>
                                <input type="text" className="form-control" placeholder="Login" id="register_form-login"/>
                            </FormGroup>

                            <FormGroup>
                                <label for="register_form-password">Password:</label>
                                <input type="text" className="form-control" placeholder="Password" id="register_form-password"/>
                            </FormGroup>

                            <FormGroup>
                                <label for="register_form-password-2">Password repeat:</label>
                                <input type="text" className="form-control" placeholder="Password repeat" id="register_form-password-2"/>
                            </FormGroup>

                            <Button className="btn btn-success">Register</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Jumbotron>
        );
    }
};