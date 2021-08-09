import React, { useState } from 'react';
import './Configuration.css';
import SourceTab from './source-tab/SourceTab';
import DestinationTab from './destination-tab/DestinationTab';
import ConfigurePolicyTab from './configure-policy-tab/ConfigurePolicyTab';
import { useConfigurations } from '../../contexts/ConfigurationsProvider';

function Configuration({getConfigData}) {
    const [activePane, setActivePane] = useState('source');
    const [stepData, setStepData] = useState({});
    const [destDataLoaded, setDestDataLoaded] = useState(false);
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
        const updatedStepData = {...stepData, ...tabData};
        setStepData(updatedStepData);
        if (tabData?.destination) {
            setDestDataLoaded(true)
        }
        // Update the Context Data only when last tab work completes
        if (tabData?.policyConfig) {
            updateConfigurationData(updatedStepData);
        }

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
        stepData, destDataLoaded
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
                                        <div className={`step cursor__pointer ${activePane === 'source' ? 'active' : ''} ${stepData?.source ? ((activePane === 'source') ? '' : 'completed') : ''}`}>
                                            <div className="content pos__rel">
                                                <div className="title">Step 1</div>
                                                <div className="description">Source</div>
                                            </div>
                                        </div>
                                        <div className={`step cursor__pointer ${activePane === 'destination' ? 'active' : ''} ${stepData?.destination ? ((activePane === 'destination') ? '' : 'completed') : ''}`} >
                                            <div className="content pos__rel">
                                                <div className="title">Step 2</div>
                                                <div className="description">Destination</div>
                                            </div>
                                        </div>
                                        <div className={`step cursor__pointer ${activePane === 'policyConfig' ? 'active' : ''} ${stepData?.policyConfig ? ((activePane === 'policyConfig') ? '' : 'completed') : ''}`} >
                                            <div className="content pos__rel">
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