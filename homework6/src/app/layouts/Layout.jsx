import React, {Component} from 'react';

import '../styles/App.css';
import Header from '../components/Header';
import Sidebar from './Sidebar';
import Footer from "../components/Footer";

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authorization: false,
            welcomeModalShow: false,
            user: null
        };
        this.handleGetCookie = this.handleGetCookie.bind(this);
    }

    handleGetCookie(cookieName) {
        let name = cookieName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    render() {
        return (
            <div className="container">
                <Header projectName="Tadeus Tunkevic Blog"/>
                <main className="row">
                    <div className="col col-lg-8">
                        {React.cloneElement(this.props.children, {
                            user: this.state.user,
                            authorization: this.state.authorization
                        })}
                    </div>
                    <Sidebar/>
                </main>
                <Footer/>
            </div>
        );
    }
}