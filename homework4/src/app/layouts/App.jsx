import React, {Component} from 'react';
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
            welcomeModalShow: false
        };
        this.handleWelcomeModalClose = this.handleWelcomeModalClose.bind(this);
    }

    componentWillMount() {
        this.setState({welcomeModalShow: true});
    }

    handleWelcomeModalClose() {
        this.setState({welcomeModalShow: false});
    }

    render() {
        return (
            <div className="container">
                <WelcomeModal modalShow={this.state.welcomeModalShow} handleWelcomeModalClose={this.handleWelcomeModalClose}/>
                <Header projectName="Tadeus Tunkevic Blog"/>
                <main className="row">
                    <Content/>
                    <Sidebar/>
                </main>
                <Footer/>
            </div>
        );
    }
}