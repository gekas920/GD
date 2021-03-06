import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {store} from "./Store/Store";
import {Provider} from "react-redux";
import Routes from "./Components/Routes";


ReactDOM.render(
    <Provider store={store}><Routes /></Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
