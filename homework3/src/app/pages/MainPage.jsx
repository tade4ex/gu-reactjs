import React, {Component} from 'react';
import Navigation from '../layouts/Navigation';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import MainPageJumbotron from '../components/mainPage/MainPageJumbotron';
import New from '../components/mainPage/MainPageNew';

let news = [
    {
        title: 'New title 1',
        description: 'Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.'
    },
    {
        title: 'New title 2',
        description: 'Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.'
    },
    {
        title: 'New title 3',
        description: 'Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.'
    },
    {
        title: 'New title 4',
        description: 'Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.'
    }
];

export default class MainPage extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            modalLoginShow: false,
        };
    }

    render() {
        let modalLoginClose = () => this.setState({ modalLoginShow: false });
        return (
            <div className="container">
                <Header projectName="Tadeus Tunkevic APP">
                    <Navigation/>
                </Header>
                <MainPageJumbotron title="Jumbotron heading"
                           lead="Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."/>
                <div className="row marketing">
                    {news.map((getNew, key) => (
                        <New key={key} title={getNew.title} description={getNew.description}/>))}
                </div>
                <Footer/>
            </div>
        );
    }
};