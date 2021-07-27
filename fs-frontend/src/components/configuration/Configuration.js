import React, { useState } from 'react';
import './Configuration.css';
import SourceTab from './source-tab/SourceTab';
import DestinationTab from './destination-tab/DestinationTab';
import ConfigurePolicyTab from './configure-policy-tab/ConfigurePolicyTab';

function Configuration({getConfigData}) {
    const [activePane, setActivePane] = useState('source');
    
    const switchToNextStep = (stepName) => {
        if (stepName === 'finish') {
            setActivePane('source')
            getConfigData({closeModal: true});
            return;
        }

        setActivePane(stepName);
    }

    return (
        <>
            <div className="fs-configuration-container">

                <div className="ui container">
                    <div className="ui fluid card">
                        <div className="content component-config-header pos__rel">
                            <div className="component-config-header-img">
                                <img src="/images/Vector.png" alt="component_default" />
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
                                                source: <SourceTab nextStep={switchToNextStep} />,
                                                destination: <DestinationTab nextStep={switchToNextStep} />,
                                                policyConfig: <ConfigurePolicyTab nextStep={switchToNextStep} />
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