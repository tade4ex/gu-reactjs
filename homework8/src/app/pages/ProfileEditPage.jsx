import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Form, FormGroup, Button} from 'react-bootstrap';

import FormComponent from "../FormComponent";
import {getUser} from '../../app/redux/actions/userActions';
import {editUser} from "../redux/actions/userActions";

class ProfileEditPage extends FormComponent {
    constructor() {
        super(...arguments);

        this.userId = this.props.params.id;

        this.state = {
            inputNameValue: '',
            inputNameOk: true,
            inputNameError: false,
            inputNameErrorMessage: '',
            inputSurnameValue: '',
            inputSurnameOk: true,
            inputSurnameError: false,
            inputSurnameErrorMessage: '',
            inputEmailValue: '',
            inputEmailOk: true,
            inputEmailError: false,
            inputEmailErrorMessage: ''
        };

        this.changeProps();

        this.handleSave = this.handleSave.bind(this);
        this.inputNameChange = this.inputNameChange.bind(this);
        this.inputSurnameChange = this.inputSurnameChange.bind(this);
        this.inputEmailChange = this.inputEmailChange.bind(this);
        this.userEditSuccess = this.userEditSuccess.bind(this);
    }

    handleSave() {
        if (
            this.state.inputNameOk &&
            this.state.inputSurnameOk &&
            this.state.inputEmailOk
        ) {
            let user = editUser(this.userId, this.state.inputNameValue, this.state.inputSurnameValue, this.state.inputEmailValue);
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

    userEditSuccess() {
        browserHistory.push(`/profile/${this.userId}`);
    }

    changeProps() {
        let user = getUser(this.userId);
        this.props.dispatch(user);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.id !== this.userId) {
            this.userId = nextProps.params.id;
            this.changeProps();
        }
        if (nextProps.user != null) {
            this.setState({
                inputEmailValue: nextProps.user.email,
                inputNameValue: nextProps.user.name,
                inputSurnameValue: nextProps.user.surname
            });
        }
    }

    render() {
        return (<div>
            <h1>USER EDIT</h1>
            {
                /* todo alert... */
                this.props.edit_success
                    ? this.userEditSuccess() : ''
            }
            {
                this.props.get_is_fetching
                    ? this.bubbling()
                    : (
                        this.props.user == null
                            ? this.alert('danger', 'user not find')
                            : <Form type="post">
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
                                {
                                    this.props.edit_is_fetching
                                        ? this.bubbling()
                                        : <p>
                                            <Button className="btn-success" onClick={this.handleSave}>Save</Button>
                                            {' '}
                                            <Button className="btn-danger" onClick={browserHistory.goBack}>Cancel</Button>
                                        </p>
                                }
                            </Form>
                    )
            }
        </div>);
    }
}

function mapStateToProps(store) {
    return {
        user: store.user.user,
        edit_success: store.user.edit_success,
        get_is_fetching: store.user.get_is_fetching,
        edit_is_fetching: store.edit_is_fetching
    };
}

export default connect(mapStateToProps)(ProfileEditPage);