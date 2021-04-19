import './helpers/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import './utils/fontawesomeLibrary';

import Root from './containers/Root';

import './styles/App.scss';

const ReactDOM = require('react-dom');

// disable StrictMode to use this feature for Accessibilty testing
if (process.env.NODE_ENV !== 'production') {
    const axe = require('@axe-core/react');
    axe(React, ReactDOM, 1000);
}

render(
  <Router basename={process.env.PUBLIC_URL}>
    <Root />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
