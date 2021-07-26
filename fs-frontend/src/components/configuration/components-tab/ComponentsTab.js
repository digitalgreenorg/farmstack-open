import React from 'react';
import { useConfigurations } from '../../../contexts/ConfigurationsProvider';
import './ComponentsTab.css';

function ComponentsTab({nextStep}) {
    const {updateConfigurationData} = useConfigurations();

    // Update ComponentsTab Data in the Context along with moving to next step.
    const updateComponentData = (compData) => {
        updateConfigurationData({components: compData});
        nextStep('credentials');
    }

    return (
        <>
            <div className="fs-conf-tab-container">
                <div className="fs-conf-tab-component cursor__pointer" onClick={e => updateComponentData('Google Spreadsheet')}>
                    <div className="component-wrapper">
                        <img className="component-img" src="/images/spreadsheets-icon.png" alt="gspreadsheet_pic" />
                        <p>Google Sheet</p>
                    </div>
                </div>
                {/* <div className="fs-conf-tab-component cursor__pointer" onClick={e => updateComponentData('Google Spreadsheet')}>
                    <div className="component-wrapper">
                        <img className="component-img" src="/images/spreadsheets-icon.png" alt="gspreadsheet_pic" />
                        <p>farmstack/gsheets</p>
                    </div>
                </div>
                <div className="fs-conf-tab-component cursor__pointer" onClick={e => updateComponentData('Google Spreadsheet')}>
                    <div className="component-wrapper">
                        <img className="component-img" src="/images/spreadsheets-icon.png" alt="gspreadsheet_pic" />
                        <p>farmstack/gsheets</p>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default ComponentsTab;