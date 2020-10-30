import Markdown from 'markdown-to-jsx';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Collapsible from 'react-collapsible';
import ReactTooltip from 'react-tooltip';
import ReactTable from 'react-table';
import ReactModal from 'react-modal';

// import summaryMap from './summary.json';
import summaryMap from './summary.json';
import * as formatit from '../helpers/formatit';
import * as sortit from '../helpers/sortit';

import InclusionBanner from './InclusionBanner';
// import ExclusionBanner from './ExclusionBanner';
import InfoModal from './InfoModal';
import DevTools from './DevTools';

export default class Summary extends Component<any, any> {
    static propTypes: any;
    subsectionTableProps: { id: string; };
    formatitHelper: any = formatit;
    sortitHelper: any = sortit;
    summaryMapData: any = summaryMap;
    constructor(props: any) {
        super(props);
        this.state = {
            showModal: false,
            modalSubSection: null
        };
        this.subsectionTableProps = { id: 'react_sub-section__table' };

        ReactModal.setAppElement('body');
    }

    componentDidMount() {
    }

    handleOpenModal = (modalSubSection: any, event: any) => {
        //only open modal   on 'enter' or click
        if (event.keyCode === 13 || event.type === "click") {
            this.setState({ showModal: true, modalSubSection });
        }
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    isSectionFlagged(section: any) {
        const { sectionFlags } = this.props;
        const subSections = Object.keys(sectionFlags[section]);

        for (let i = 0; i < subSections.length; ++i) {
            if (this.isSubsectionFlagged(section, subSections[i])) {
                return true;
            }
        }

        return false;
    }

    isSubsectionFlagged(section: any, subSection: any) {
        const { sectionFlags } = this.props;
        if (sectionFlags[section][subSection] === true) {
            return true;
        } else if (sectionFlags[section][subSection] === false) {
            return false;
        } else if (sectionFlags[section][subSection] !== undefined && (sectionFlags[section][subSection] instanceof Array) && sectionFlags[section][subSection].length > 0) {
            return sectionFlags[section][subSection].length > 0;
        } else if (typeof sectionFlags[section][subSection] === 'string') {
            return sectionFlags[section][subSection];
        } else {
        }
    }

    // if flagged, returns flag text, else returns false
    isEntryFlagged(section: any, subSection: any, entry: any) {
        const { sectionFlags } = this.props;
        let flagged = false;
        if (sectionFlags[section][subSection]) {
            sectionFlags[section][subSection].forEach((flag: any) => {
                if (flag.entryId === entry._id) {
                    flagged = flag.flagText;
                }
            });
        }

        return flagged;
    }

    renderNoEntries(section: any, subSection: any) {
        const flagged = this.isSubsectionFlagged(section, subSection.dataKey);
        const flaggedClass = flagged ? 'flagged' : '';
        const flagText = this.props.sectionFlags[section][subSection.dataKey];
        const tooltip = flagged ? flagText : '';
        if (section === 'UrineDrugScreening' && (this.props.summary['UrineDrugScreening'].UrineDrugScreens.length === 0)) {
            return (
                <div className="table">
                    <div className="no-entries">
                        <FontAwesomeIcon
                            className={'flag flag-no-entry ' + flaggedClass}
                            icon="exclamation-circle"
                            title={'flag:' + tooltip}
                            data-tip={tooltip}
                            data-role="tooltip"
                            tabIndex={0}
                        />
                        <Markdown>{this.props.summary['UrineDrugScreening'].Recommendation10Text}</Markdown>
                    </div>
                </div>
            );
        }

        return (
            <div className="table">
                <div className="no-entries">
                    <FontAwesomeIcon
                        className={'flag flag-no-entry ' + flaggedClass}
                        icon="exclamation-circle"
                        title={'flag:' + tooltip}
                        data-tip={tooltip}
                        data-role="tooltip"
                        tabIndex={0}
                    />
                    no entries found
                </div>
            </div>
        );
    }

    createSharedDecisionEntries(entries: any) {
        entries.forEach((entry) => {
            let question = this.props.questionText.get(entry.LinkId);
            if (question !== null && question !== undefined) {
                //   entry.Answer = this.props.questionText.get(entry.LinkId) + entry.Answer;
                entry.Question = this.props.questionText.get(entry.LinkId);
            }
            if (entry.Location && (entry.Location !== null)) {
                let locationWord = entry.Location.match(/(\b[A-Z0-9][A-Z0-9]+|\b[A-Z]\b)/g);
                if (locationWord !== null) {
                    entry.Location = locationWord;
                }
            }
            if (entry.PainYesNo && (entry.PainYesNo !== null) && (entry.PainYesNo === true)) {
                entry.PainYesNo = 'Y'
            }
        })
        return entries;
    }



    renderTable(table: any, entries: any, section: any, subSection: any, index: any) {
        // If a filter is provided, only render those things that have the filter field (or don't have it when it's negated)
        let filteredEntries = entries;
        if ((section === 'SharedDecisionMaking') && entries !== null && entries !== undefined && entries.length > 0) {
            filteredEntries = this.createSharedDecisionEntries(entries);
        }
        if (table.filter && table.filter.length > 0) {
            // A filter starting with '!' is negated (looking for absence of that field)
            const negated = table.filter[0] === '!';
            const filter = negated ? table.filter.substring(1) : table.filter;
            filteredEntries = entries.filter((e: any) => negated ? e[filter] == null : e[filter] != null);
        }
        if (filteredEntries.length === 0) return null;

        const headers = Object.keys(table.headers);
        const columns = [
            {
                id: 'flagged',
                Header: <span aria-label="flag"></span>,
                accessor: (entry: any) => this.isEntryFlagged(section, subSection.dataKey, entry),
                Cell: (props: any) =>
                    <FontAwesomeIcon
                        className={'flag flag-entry ' + (props.value ? 'flagged' : '')}
                        icon="exclamation-circle"
                        title={props.value ? 'flag: ' + props.value : 'flag'}
                        data-tip={props.value ? props.value : ''}
                        role="tooltip"
                        tabIndex={0}
                    />,
                sortable: false,
                width: 35,
                minWidth: 35
            }
        ];
        headers.forEach((header) => {
            const headerKey = table.headers[header];

            const column: any = {
                id: header,
                Header: () => <span className="col-header">{header}</span>,
                accessor: (entry: any) => {
                    let value = entry[headerKey];
                    if (headerKey.formatter) {
                        const { result } = this.props;
                        let formatterArguments = headerKey.formatterArguments || [];
                        value = this.formatitHelper[headerKey.formatter](result, entry[headerKey.key], ...formatterArguments);
                    }

                    return value;
                },
                sortable: headerKey.sortable !== false
            };

            if (column.sortable && headerKey.formatter) {
                switch (headerKey.formatter) {
                    case 'dateFormat':
                    case 'dateAgeFormat':
                        column.sortMethod = sortit.dateCompare;
                        break;
                    case 'datishFormat':
                    case 'datishAgeFormat':
                        column.sortMethod = sortit.datishCompare;
                        break;
                    case 'ageFormat':
                        column.sortMethod = sortit.ageCompare;
                        break;
                    case 'quantityFormat':
                        column.sortMethod = sortit.quantityCompare;
                        break;
                    default:
                    // do nothing, rely on built-in sort
                }
            }

            if (headerKey.minWidth != null) {
                column.minWidth = headerKey.minWidth;
            }

            if (headerKey.maxWidth != null) {
                column.maxWidth = headerKey.maxWidth;
            }

            columns.push(column);
        });

        //ReactTable needs an ID for aria-describedby
        let tableID = subSection.name.replace(/ /g, "_") + "-table";
        let customProps = { id: tableID };
        //getTheadThProps solution courtesy of:
        //https://spectrum.chat/react-table/general/is-there-a-way-to-activate-sort-via-onkeypress~66656e87-7f5c-4767-8b23-ddf35d73f8af
        return (
            <div key={index} className="table" role="table"
                aria-label={subSection.name} aria-describedby={customProps.id}>
                <ReactTable
                    className="sub-section__table"
                    columns={columns}
                    data={filteredEntries}
                    minRows={1}
                    // showPagination={filteredEntries.length > 10}
                    showPagination={false}
                    // pageSizeOptions={[10, 20, 50, 100]}
                    // defaultPageSize={10}
                    resizable={false}
                    getProps={() => customProps}
                    getTheadThProps={(state, rowInfo, column, instance) => {
                        return {
                            tabIndex: 0,
                            onKeyPress: (e: { which: number; stopPropagation: () => void; }, handleOriginal: any) => {
                                if (e.which === 13) {
                                    instance.sortColumn(column);
                                    e.stopPropagation();
                                }
                            }
                        };
                    }}
                />
            </div>
        );
        // }


    }

    renderSection(section: string) {
        const sectionMap = this.summaryMapData[section];


        return sectionMap.map((subSection: any) => {
            // console.log('subSection: ', subSection);
            const data = this.props.summary[subSection.dataKeySource][subSection.dataKey];
            const entries = (Array.isArray(data) ? data : [data]).filter(r => r != null);
            const hasEntries = entries.length !== 0;

            const flagged = this.isSubsectionFlagged(section, subSection.dataKey);
            const flaggedClass = flagged ? 'flagged' : '';
            let datatable;
            if (subSection.dataKey === "CoMorbidConditionsIncreasingRiskWhenUsingOpioids") {
                subSection.recommendationText = this.props.summary.PertinentConditions.Recommendation8Text;
            }
            if (subSection.dataKey === 'OpioidMedications') {
                if (this.props.summary.CurrentPertinentTreatments.CurrentMME[0].Result >= 50) {
                    subSection.recommendationText = this.props.summary.CurrentPertinentTreatments.Recommendation5Text;
                } else if ((this.props.summary.CurrentPertinentTreatments.CurrentMME[0].Result < 50) || (this.props.summary.CurrentPertinentTreatments.CurrentMME[0].Result === null)) {
                    subSection.recommendationText = this.props.summary.CurrentPertinentTreatments.Recommendation3Text;
                } else if ((this.props.summary.CurrentPertinentTreatments.OpioidMedications.length > 0) && (this.props.summary.CurrentPertinentTreatments.BenzodiazepineMedications.length > 0)) {
                    subSection.recommendationText = this.props.summary.CurrentPertinentTreatments.Recommendation11Text;
                }
                datatable = (
                    <div id={subSection.dataKey} className="sub-section__header">
                        <FontAwesomeIcon
                            className={'flag flag-nav ' + flaggedClass}
                            icon={flagged ? 'exclamation-circle' : 'circle'}
                            title="flag"
                            tabIndex={0}
                        />
                        <div id="opioid-title">
                            <h3 className="opioid-name">{subSection.name}
                                {subSection.info &&
                                    <div
                                        onClick={(event) => this.handleOpenModal(subSection, event)}
                                        onKeyDown={(event) => this.handleOpenModal(subSection, event)}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={subSection.name}>
                                        <FontAwesomeIcon
                                            className='info-icon'
                                            icon="info-circle"
                                            title={'more info: ' + subSection.name}
                                            data-tip="more info"
                                            role="tooltip"
                                            tabIndex={0}
                                        />
                                    </div>
                                }
                            </h3>
                            <div className="total-mme-link">
                                <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/url?q=http://build.fhir.org/ig/cqframework/opioid-mme-r4/Library-MMECalculator.html&sa=D&ust=1603413553690000&usg=AFQjCNHoWmeK3G7VrDkxD7MeJI6A3syYYA"> Total MME/Day: </a>
                                <span>{this.props.summary.CurrentPertinentTreatments.CurrentMME[0].Result !== null ? this.props.summary.CurrentPertinentTreatments.CurrentMME[0].Result : "0"} mg/day</span>
                            </div>
                        </div>


                    </div>)
            } else {
                datatable = (<div id={subSection.dataKey} className="sub-section__header">
                    <FontAwesomeIcon
                        className={'flag flag-nav ' + flaggedClass}
                        icon={flagged ? 'exclamation-circle' : 'circle'}
                        title="flag"
                        tabIndex={0}
                    />
                    <h3>{subSection.name}</h3>

                    {subSection.info &&
                        <div
                            onClick={(event) => this.handleOpenModal(subSection, event)}
                            onKeyDown={(event) => this.handleOpenModal(subSection, event)}
                            role="button"
                            tabIndex={0}
                            aria-label={subSection.name}>
                            <FontAwesomeIcon
                                className='info-icon'
                                icon="info-circle"
                                title={'more info: ' + subSection.name}
                                data-tip="more info"
                                role="tooltip"
                                tabIndex={0}
                            />
                        </div>
                    }
                </div>)
            }

            return (
                <div key={subSection.dataKey} className="sub-section h3-wrapper">
                    {datatable}

                    {!hasEntries && this.renderNoEntries(section, subSection)}
                    {hasEntries && subSection.tables.map((table: any, index: any) =>
                        this.renderTable(table, entries, section, subSection, index))
                    }
                </div>
            );
        });
    }

    renderSectionHeader(section: any) {

        let title = '';
        if (section === 'PertinentConditions') {
            title = 'Pertinent Conditions';
        } else if (section === 'CurrentPertinentTreatments') {
            title = 'Current Pertinent Treatments';
        } else if (section === 'UrineDrugScreening') {
            title = 'Urine Drug Screening';
        } else if (section === 'SharedDecisionMaking') {
            title = `Shared Decision Making`;
        }

        return (
            <h2 id={section} className="section__header">
                <div className="section__header-title">

                    <span className="span-class">
                        {title}
                    </span>
                </div>

                <FontAwesomeIcon className="caret" icon="caret-right" title="expand/collapse" />
            </h2>
        );
    };

    render() {
        const { summary, collector, qrCollector, result, cdsCollector, questionText } = this.props;
        // const meetsInclusionCriteria = summary.Patient.MeetsInclusionCriteria;
        const meetsInclusionCriteria = true;
        let sharedDecisionSection = this.props.summary["SharedDecisionMaking"];
        let submitDate;
        if (sharedDecisionSection.MyPAINSubmitDate.length > 0) {
            submitDate = this.formatitHelper.datishFormat('dateFormat', sharedDecisionSection.MyPAINSubmitDate);
        } else {
            submitDate = '';
        }
        if (!summary) {
            return null;
        }

        return (
            <div className="summary">

                <div className="summary__display" id="maincontent">
                    <div className="summary__display-title">
                        Factors to Consider in Managing Chronic Pain
                    </div>

                    {!meetsInclusionCriteria && <InclusionBanner dismissible={meetsInclusionCriteria} />}

                    {meetsInclusionCriteria &&
                        <div className="sections">
                            <Collapsible tabIndex={0} trigger={this.renderSectionHeader("PertinentConditions")}
                                open={false}>
                                {this.renderSection("PertinentConditions")}
                            </Collapsible>

                            <Collapsible tabIndex={0} trigger={this.renderSectionHeader("CurrentPertinentTreatments")}
                                open={false}>
                                {this.renderSection("CurrentPertinentTreatments")}
                            </Collapsible>

                            <Collapsible tabIndex={0} trigger={this.renderSectionHeader("UrineDrugScreening")} open={false}>
                                {this.renderSection("UrineDrugScreening")}
                            </Collapsible>
                            {/* If there is Shared Decision Making data, default below to open, else Pertinent Medical History is open on launch */}
                            <Collapsible tabIndex={0} trigger={this.renderSectionHeader("SharedDecisionMaking")} open={true}>

                                <div className="shared-top-section">
                                    {submitDate.length > 0 ? <p className='submit-date-text'>The information below was provided by the patient on {submitDate} using the MyPAIN application</p> : ''}

                                    <div className="activity-section">
                                        {sharedDecisionSection.ActivityGoals.length > 0 ? <div className="activity-goals">
                                            <h3>ACTIVITY GOALS</h3>
                                            <div>{sharedDecisionSection.ActivityGoals || "No activity goals submitted"}</div>
                                        </div> : ''}
                                        {sharedDecisionSection.ActivityGoals.length > 0 ? <div className="activity-barriers">
                                            <h3>ACTIVITY BARRIERS</h3>
                                            <div>{sharedDecisionSection.ActivityBarriers || "No activity barriers submitted"}</div>
                                        </div> : ''}
                                    </div>
                                </div>
                                {<div className="shared-decision-making-section">
                                    {this.renderSection("SharedDecisionMaking")}
                                </div>}
                            </Collapsible>
                        </div>
                    }

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

                    <DevTools
                        collector={collector}
                        qrCollector={qrCollector}
                        result={result}
                        cdsCollector={cdsCollector}
                        questionText={questionText}
                    />

                    <ReactTooltip className="summary-tooltip" />

                    <ReactModal
                        className="modal"
                        overlayClassName="overlay"
                        isOpen={this.state.showModal}
                        onRequestClose={this.handleCloseModal}
                        contentLabel="More Info">
                        <InfoModal
                            closeModal={this.handleCloseModal}
                            subSection={this.state.modalSubSection} />
                    </ReactModal>
                </div>
            </div>
        );
    }
}


Summary.propTypes = {
    summary: PropTypes.object.isRequired,
    sectionFlags: PropTypes.object.isRequired,
    collector: PropTypes.array.isRequired,
    cdsCollector: PropTypes.array,
    qrCollector: PropTypes.array.isRequired,
    result: PropTypes.object.isRequired,
    numMedicalHistoryEntries: PropTypes.number.isRequired,
    numPainEntries: PropTypes.number.isRequired,
    numTreatmentsEntries: PropTypes.number.isRequired,
    numRiskEntries: PropTypes.number.isRequired
};
