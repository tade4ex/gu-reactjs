import React, {Component} from 'react';
import axios from 'axios';
import '../styles/App.css';
import Header from '../components/Header';
import Content from '../components/Content';
import Sidebar from './Sidebar';
import Footer from "../components/Footer";
import WelcomeModal from "../components/WelcomeModal";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authorization: false,
            welcomeModalShow: false,
            user: null
        };
        this.handleWelcomeModalClose = this.handleWelcomeModalClose.bind(this);
        this.handleAuthorization = this.handleAuthorization.bind(this);
        this.handleGetCookie = this.handleGetCookie.bind(this);
    }

    componentWillMount() {
        axios.get('/api/authorization')
            .then((res) => {
                console.log(res);
                if (res.data != null) {
                    this.setState({
                        authorization: true,
                        user: res.data
                    });
                } else {
                    this.setState({
                        authorization: false,
                        user: {}
                    });
                }

            })
            .then((err) => {});
    }

    handleWelcomeModalClose() {
        this.setState({welcomeModalShow: false});
    }

    handleAuthorization(authorization) {
        if (authorization === false) {
            this.setState({user: {}});
        }
        this.setState({authorization: authorization});
    }

    handleGetCookie(cookieName) {
        let name = cookieName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    render() {
        return (
            <div className="container">
                <WelcomeModal modalShow={this.state.welcomeModalShow} handleWelcomeModalClose={this.handleWelcomeModalClose}/>
                <Header projectName="Tadeus Tunkevic Blog"/>
                <main className="row">
                    <Content/>
                    <Sidebar handleGetCookie={this.handleGetCookie} user={this.state.user} authorization={this.state.authorization} handleAuthorization={this.handleAuthorization}/>
                </main>
                <Footer/>
            </div>
        );
    }
}