import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
  static propTypes: any;
  render() {

    return (
      <header className="header">
        <div className="header__logo">
          <span className="header__logo-text">PainManager</span>
        </div>
            <div className="header-notice">
              <p>NOTE:  This summary is not intended for patients who are undergoing end-of-life care (hospice or palliative) or active cancer treatment.</p>
            </div>
      </header>
    );
  }
}

Header.propTypes = {
  patientName: PropTypes.string,
  patientAge: PropTypes.number,
  patientGender: PropTypes.string,
  totalEntries: PropTypes.number,
  numFlaggedEntries: PropTypes.number,
  meetsInclusionCriteria: PropTypes.bool
};
