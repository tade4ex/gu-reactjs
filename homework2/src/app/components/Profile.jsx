import React from 'react';
import ProfileLine from './ProfileLine';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateTimeNow: null
        };
        this.handleClickDateNow = this.handleClickDateNow.bind(this);
    }

    handleClickDateNow() {
        let d = new Date();
        let date = [
            d.getFullYear(),
            d.getMonth() + 1,
            d.getDate()
        ].map((a) => a < 10 ? `0${a}` : `${a}`).join('-');
        let time = [
            d.getHours(),
            d.getMinutes(),
            d.getSeconds()
        ].map((a) => a < 10 ? `0${a}` : `${a}`).join(':');
        this.setState(prevState => ({
            dateTimeNow: <ProfileLine label={"datetime"} value={`${date} ${time}`}/>
        }));
    }

    render() {
        return <div>
            <h1>DEV PROFILE</h1>
            <ProfileLine label={"name"} value={this.props.name}/>
            <ProfileLine label={"surname"} value={this.props.surname}/>
            <ProfileLine label={"email"} value={this.props.email}/>
            {this.state.dateTimeNow != null ? this.state.dateTimeNow : ""}
            <br/>
            <button onClick={this.handleClickDateNow}>Show datetime now</button>
        </div>
    }
}

module.exports = Profile;