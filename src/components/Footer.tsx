import React, { Component } from 'react';

// import summaryMap from './summary.json';
import pkg from '../../package.json'


export default class Footer extends Component {
 appVersion = pkg.version;

 render() {
    return  <footer>
        <p>PainManager v{this.appVersion}</p>
    </footer>
    
 }
}