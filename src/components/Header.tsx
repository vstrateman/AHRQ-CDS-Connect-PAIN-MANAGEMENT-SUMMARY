import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Header extends Component {
  static propTypes: any;
  render() {
    // const {
    //   patientName, patientAge, patientGender, totalEntries, numFlaggedEntries, meetsInclusionCriteria
    // }: any = this.props;

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
  patientName: PropTypes.string.isRequired,
  patientAge: PropTypes.number.isRequired,
  patientGender: PropTypes.string.isRequired,
  totalEntries: PropTypes.number.isRequired,
  numFlaggedEntries: PropTypes.number.isRequired,
  meetsInclusionCriteria: PropTypes.bool.isRequired
};
