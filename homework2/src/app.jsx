import React from 'react';
import ReactDOM from 'react-dom';

import Profile from './app/components/Profile';

const app = document.getElementById('app');

ReactDOM.render(
    <Profile name={"Tadeus"} surname={"Tunkevic"} email={"tade4ex@gmail.com"}/>,
    app);