import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
  static propTypes: any;
  render() {

    return (
      <header className="header">
        <div className="header__logo">
          <img className="header__logo-img" src={`${process.env.PUBLIC_URL}/assets/images/Pain_Manager_LOGO.jpg`} alt="Pain Manager Logo" />
          <span className="header__logo-text"></span>
        </div>
        <div className="header-notice">
          <p role="note">NOTE:  This summary is not intended for patients who are undergoing end-of-life care (hospice or palliative) or active cancer treatment.</p>
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
