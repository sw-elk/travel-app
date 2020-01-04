import React from 'react';

import {HashRouter as Router, Route} from 'react-router-dom';

import Home from '../containers/Home.jsx';
import Hello from '../containers/Hello.jsx';


const getRouter = () => (
    <Router>
        <Router exact path="/" />
    </Router>
);

export default getRouter;