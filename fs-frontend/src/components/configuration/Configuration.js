import React, { useState } from 'react';
import './Configuration.css';
import SourceTab from './source-tab/SourceTab';
import DestinationTab from './destination-tab/DestinationTab';
import ConfigurePolicyTab from './configure-policy-tab/ConfigurePolicyTab';
import { useConfigurations } from '../../contexts/ConfigurationsProvider';

function Configuration({getConfigData}) {
    const [activePane, setActivePane] = useState('source');
    const [stepData, setStepData] = useState({});
    // Get the exposed context function to update the context data
    const { updateConfigurationData } = useConfigurations();
    
    const switchToNextStep = (stepName) => {
        if (stepName === 'finish') {
            setActivePane('source')
            getConfigData({closeModal: true});
            return;
        }
        
        setActivePane(stepName);
    }

    function getTabData(tabData) {
        console.log('Tab Data in Configuration.js: ', tabData)
        setStepData(prevData => { return {...prevData, ...tabData}; });
        // Update the Context Data for the Source Tab
        updateConfigurationData(stepData);

    }

    function selectedConnector() {
        const connector = stepData?.source?.connector;
        switch(connector) {
            case 'CSV':
                return <img src="/images/csv_ico.svg" alt="csv_icon" />
            case 'GOOGLE_SHEET':
                return <img src="/images/gsheet_ico.svg" alt="gsheet_icon" />
            default:
                return <img src="/images/Vector.png" alt="component_default" />
        }
    }

    const childrenData = {
        nextStep: switchToNextStep,
        collectData: getTabData,
        stepData
    }

    return (
        <>
            <div className="fs-configuration-container">

                <div className="ui container">
                    <div className="ui fluid card">
                        <div className="content component-config-header pos__rel">
                            <div className="component-config-header-img">
                                {selectedConnector()}
                            </div>
                            <div className="header">Creating a Connection</div>
                            <div className="meta">Step by step process to guide you through adding your own container</div>
                        </div>
                        <div className="content">
                            <div className="description">
                                <div className="fs-conf-content">
                                    <div className="ui tablet stackable top attached fluid steps">
                                        <div className={`step cursor__pointer ${activePane === 'source' ? 'active' : ''}`} onClick={e => switchToNextStep('source')}>
                                            <div className="content">
                                                <div className="title">Step 1</div>
                                                <div className="description">Source</div>
                                            </div>
                                        </div>
                                        <div className={`step cursor__pointer ${activePane === 'destination' ? 'active' : ''}`} onClick={e => switchToNextStep('destination')}>
                                            <div className="content">
                                                <div className="title">Step 2</div>
                                                <div className="description">Destination</div>
                                            </div>
                                        </div>
                                        <div className={`step cursor__pointer ${activePane === 'policyConfig' ? 'active' : ''}`} onClick={e => switchToNextStep('policyConfig')}>
                                            <div className="content">
                                                <div className="title">Step 3</div>
                                                <div className="description">Configure Policy</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ui attached segment">
                                        {
                                            {
                                                source: <SourceTab {...childrenData} />,
                                                destination: <DestinationTab {...childrenData} />,
                                                policyConfig: <ConfigurePolicyTab {...childrenData} />
                                            }[activePane]
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Configuration;