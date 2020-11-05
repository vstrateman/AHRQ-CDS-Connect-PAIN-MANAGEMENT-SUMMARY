import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class InclusionBanner extends Component<any, any> {
  static propTypes: { dismissible: PropTypes.Validator<boolean>; };
  constructor(props: any) {
    super(props);
    this.state = {
      displayed: true
    };
  }

  handleClose = () => {
    this.setState({ displayed: false });
  }

  render() {
    return (
      <div
        className="inclusion-banner banner"
        style={{ display: this.state.displayed ? 'block' : 'none' }}
        role="banner">
        {this.props.dismissible &&
          <FontAwesomeIcon className="close-button" icon="times" onClick={this.handleClose} title="close" />
        }

        <div className="inclusion-banner__tag banner warning-inside">
          This patient does not meet the applicable criteria.
        </div>

        <div className="inclusion-banner__description">
          <strong><FontAwesomeIcon icon="exclamation-circle" title="warning" /> WARNING:</strong> This summary
          applies to patients 18 years or older who meet at least one of the following criteria:

          <ul>
            <li>Has a condition likely to indicate chronic pain</li>
            <li>Has an active opioid medication in the last 180 days</li>
            <li>Has an active adjuvant analgesic medication in the last 180 days</li>
          </ul>
        </div>
        <div className="cdc-disclaimer">
          Please see the
            <a
            href="https://www.cdc.gov/mmwr/volumes/65/rr/rr6501e1.htm"
            data-alt="CDC Guideline for Prescribing Opioids for Chronic Pain"
            target="_blank"
            rel="noopener noreferrer">
            CDC Guideline for Prescribing Opioids for Chronic Pain
            </a>
          for additional information and prescribing guidance.
        </div>
      </div>

    );
  }
}

InclusionBanner.propTypes = {
  dismissible: PropTypes.bool.isRequired
};
