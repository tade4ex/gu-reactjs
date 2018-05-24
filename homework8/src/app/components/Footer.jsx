import React, {Component} from 'react';
import '../styles/Footer.css';

export default class Footer extends Component {
    render() {
        let date = new Date().getFullYear();
        return (
            <footer className="footer">
                <p>© {date}, by Tadeus Tunkevic (tade4ex@gmail.com)</p>
            </footer>
        );
    }
}