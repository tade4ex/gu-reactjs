import React, {Component} from 'react';
import {Jumbotron, Form, FormGroup, Button} from 'react-bootstrap';
import SidebarRegisterModal from "./SidebarRegisterModal";
import AuthStore from '../../flux/store/AuthStore';
import {authCheckUser} from '../../flux/actions/authActions';

export default class SidebarAuthorization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'Guest',
            modalShow: false,
            sidebarInputEmailValue: '',
            sidebarInputEmailOk: false,
            sidebarInputEmailError: false,
            sidebarInputEmailErrorMessage: '',
            sidebarInputPasswordValue: '',
            sidebarInputPasswordOk: false,
            sidebarInputPasswordError: false,
            sidebarInputPasswordErrorMessage: false
        };
        this.handleOpenCloseRegisterModal = this.handleOpenCloseRegisterModal.bind(this);
        this.sidebarInputEmailChange = this.sidebarInputEmailChange.bind(this);
        this.sidebarInputPasswordChange = this.sidebarInputPasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.onAuthChange = this.onAuthChange.bind(this);
    }

    handleLogin() {
        if (
            this.state.sidebarInputEmailOk &&
            this.state.sidebarInputPasswordOk
        ) {
            authCheckUser(this.state.sidebarInputEmailValue, this.state.sidebarInputPasswordValue);
        }
    }

    onAuthChange(authorization) {
        if (
            this.state.sidebarInputEmailOk &&
            this.state.sidebarInputPasswordOk &&
            authorization === false
        ) {
            alert('Bad email of password');
        }
    }

    componentWillMount()
    {
        AuthStore.on('change', this.onAuthChange);
    }

    componentWillUnmount(){
        AuthStore.removeListener('change', this.onAuthChange);
    }

    handleOpenCloseRegisterModal() {
        this.setState({modalShow: !this.state.modalShow});
    }

    sidebarInputEmailChange(e) {
        let value = e.target.value;
        if ((e.type === 'change' && this.state.sidebarInputEmailError === true) || e.type === 'blur') {
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
                sidebarInputEmailOk: !isError,
                sidebarInputEmailError: isError,
                sidebarInputEmailErrorMessage: errorMessage
            });
        }
        this.setState({
            sidebarInputEmailValue: value
        });
    }

    sidebarInputPasswordChange(e) {
        let value = e.target.value;
        this.setState({sidebarInputPasswordError: value});
        if ((e.type === 'change' && this.state.sidebarInputPasswordError === true) || e.type === 'blur') {
            let isError = false;
            let errorMessage = '';
            if (value.length < 6) {
                isError = true;
                errorMessage = 'Name must min 6 symbols!';
            }
            this.setState({
                sidebarInputPasswordOk: !isError,
                sidebarInputPasswordError: isError,
                sidebarInputPasswordErrorMessage: errorMessage
            });
        }
        this.setState({
            sidebarInputPasswordValue: value
        });
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h4>Hello, {this.state.username}!</h4>
                    <Form>
                        <FormGroup className={(this.state.sidebarInputEmailError ? 'has-error' : '')}>
                            <label htmlFor="sidebarInputEmail">Email address:</label>
                            <input type="email" className="form-control" id="sidebarInputEmail"
                                   placeholder="Email address" value={this.state.sidebarInputEmailValue}
                                   aria-describedby="sidebarInputEmailHelpBox"
                                   onBlur={this.sidebarInputEmailChange} onChange={this.sidebarInputEmailChange}/>
                            <span id="sidebarInputEmailHelpBox"
                                  className="help-block">{(this.state.sidebarInputEmailError ? this.state.sidebarInputEmailErrorMessage : '')}</span>
                        </FormGroup>
                        <FormGroup className={(this.state.sidebarInputPasswordError ? 'has-error' : '')}>
                            <label htmlFor="sidebarInputEmail">Password:</label>
                            <input type="password" className="form-control" id="sidebarInputPassword"
                                   placeholder="Password" value={this.state.sidebarInputPasswordValue}
                                   aria-describedby="sidebarInputPasswordHelpBox"
                                   onBlur={this.sidebarInputPasswordChange} onChange={this.sidebarInputPasswordChange}/>
                            <span id="sidebarInputPasswordHelpBox"
                                  className="help-block">{(this.state.sidebarInputPasswordError ? this.state.sidebarInputPasswordErrorMessage : '')}</span>
                        </FormGroup>
                        <Button className="btn-default" onClick={this.handleLogin}>Login</Button> or <a
                        onClick={this.handleOpenCloseRegisterModal} href="#">register</a>
                    </Form>
                </Jumbotron>
                <SidebarRegisterModal modalShow={this.state.modalShow}
                                      handleCloseRegisterModal={this.handleOpenCloseRegisterModal}/>
            </div>
        );
    }
}