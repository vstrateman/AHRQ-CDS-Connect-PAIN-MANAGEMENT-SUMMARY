import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import React, { Component } from 'react';

// import summaryMap from './summary.json';
import pkg from '../../package.json'


export default class Footer extends Component<any, any> {
    appConfig: any = {};
    showTools: boolean = this.props.showTools;
    handleDevTools = () => {
        this.showTools = !this.showTools;
        console.log('props: ', this.props)
        this.props.receiveTools(this.showTools);
    }
    // constructor(props) {
    //     super(props)
    //     // console.log('props:', props)
    //     // this.appConfig = props.config;
    // }
    appVersion = pkg.version;

    componentDidMount() {
        this.appConfig = this.props.children;
    }

    render() {
        return <footer>
            <p className="app-version">PainManager v{this.appVersion}</p>
            {/* {this.props.children !== undefined ? (<div className="info-box">
                <p>This SGL version of PainManager does not support linking out from the application. If you need more information about the CDC Opioid Guideline referenced here, please visit: [<span>{this.appConfig.CDCLink}</span>].</p>
                <p> To provide comments on this release or PainManager, please complete this REDCap survey: [<span>{this.appConfig.redcapSurveyLink}</span>].</p>
            </div>) : (
                    <div className="info-box">
                        <p>This SGL version of PainManager does not support linking out from the application. If you need more information about the CDC Opioid Guideline referenced here, please visit: [<span>https://www.cdc.gov/drugoverdose/prescribing/guidance.html</span>].</p>
                        <p> To provide comments on this release or PainManager, please complete this REDCap survey: [<span>Contract your administrator for link</span>].</p>
                    </div>
                )} */}
            {/* // <div className="info-box">
                //     <p>This SGL version of PainManager does not support linking out from the application. If you need more information about the CDC Opioid Guideline referenced here, please visit: [<span>{this.appConfig.CDCLink}</span>].</p>
            //     <p> To provide comments on this release or PainManager, please complete this REDCap survey: [<span>{this.appConfig.redcapSurveyLink}</span>].</p>
            // </div> */}
            <FontAwesomeIcon icon={faPlus} size="2x" title="toggle" className="dev-tools-icon" onClick={this.handleDevTools} />
        </footer>

    }
}