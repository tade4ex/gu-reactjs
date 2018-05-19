import React, {Component} from 'react';

export default class MasterComponent extends Component {
    constructor() {
        super(...arguments);
    }

    getDateTime() {
        let d = new Date();
        let date = [d.getDate(), d.getMonth() + 1, d.getFullYear()].map((a) => a < 10 ? `0${a}` : a).join('-');
        let time = [d.getHours(), d.getMinutes(), d.getSeconds()].map((a) => a < 10 ? `0${a}` : a).join(':');
        return `${date} ${time}`;
    }

    checkInput(e, name, check) {
        let state = {};
        let value = e.target.value;
        if ((e.type === 'change' && this.state[`${name}Error`] === true) || e.type === 'blur') {
            let isError = false;
            let errorMessage = '';
            if (typeof check.len === "object") {
                if (value.length < check.len.len) {
                    isError = true;
                    errorMessage = check.len.errorMessage;
                }
            }
            if (typeof check.regexp === "object") {
                if (!check.regexp.regexp.test(value)) {
                    isError = true;
                    errorMessage = check.regexp.errorMessage;
                }
            }
            if (typeof check.anotherValue === "object") {
                switch (check.anotherValue.operation) {
                    case '!==':
                        if (value !== this.state[`${check.anotherValue.name}Value`]) {
                            isError = true;
                            errorMessage = check.anotherValue.errorMessage;
                        }
                        break;
                }
            }
            state[`${name}Ok`] = !isError;
            state[`${name}Error`] = isError;
            state[`${name}ErrorMessage`] = errorMessage;
            this.setState(state);
        }
        state = {};
        state[`${name}Value`] = value;
        this.setState(state);
    }

    bubbling() {
        return <div className="bubblingG">
            <span id="bubblingG_1"/>
            <span id="bubblingG_2"/>
            <span id="bubblingG_3"/>
        </div>
    }

    alert(status, message) {
        return <div className={`alert alert-${status}`} role="alert">{message}</div>
    }
}