import React, { Component } from 'react';

// import summaryMap from './summary.json';
import pkg from '../../package.json'


export default class Footer extends Component<any, any> {
    appConfig: any = {};
    // constructor(props) {
    //     super(props)
    //     // console.log('props:', props)
    //     // this.appConfig = props.config;
    // }
    appVersion = pkg.version;

    componentDidMount() {
        this.appConfig = this.props.children;
        console.log('props:', this.props.children)

    }

    render() {
        return <footer>
            <p className="app-version">PainManager v{this.appVersion}</p>
            <div className="info-box">
                <p>This SGL version of PainManager does not support linking our from the application. If you need more information about the CDC Opioid Guideline referenced here, please visit: [<span>{this.appConfig.CDCLink}</span>].</p>
                <p> To provide comments on this release or PainManager, please complete this REDCap survey: [<span>{this.appConfig.redcapSurveyLink}</span>].</p>
            </div>
        </footer>

    }
}