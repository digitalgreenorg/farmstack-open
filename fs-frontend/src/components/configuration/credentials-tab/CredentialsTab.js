import React from 'react';
import './CredentialsTab.css';
import { useConfigurations } from '../../../contexts/ConfigurationsProvider';

function CredentialsTab({nextStep}) {
    const {updateConfigurationData} = useConfigurations();

    const updateCredentialsData = (credData) => {
        updateConfigurationData({credentials: credData});
        nextStep('input')
    }
    return (
        <>
            <div className="fs-credentials-tab-content">
                <div className="fs-credentials-tab-content-body">

                    <div className="fs-credential-icon-container pos__rel">
                        <i aria-hidden="true" className="lock icon" />
                        {/* <span className="fs-credentials-count">0</span> */}
                    </div>
                    <div className="content">
                        <div className="header">You don't have any credentials yet.</div>
                        <div className="meta">In order to create integrations with Google Sheets you need to provide your authentication data, e.g. AP Key. These authentication data will be encrypted and will only be used to communicate with Google Sheets for seamless integration.</div>
                        <div className="credential-learn-more">
                            <p>Learn More</p>
                        </div>
                    </div>
                    <button className="ui icon button fs-primary-btn ">
                        <i aria-hidden="true" className="plus icon" />&nbsp;
                        Add New Credential
                    </button>
                </div>
                <div className="step-change-btn-wrapper">
                    <button className="ui icon button fs-primary-outline-btn" onClick={() => updateCredentialsData('Credentials Added')}>Continue</button>
                </div>
            </div>
        </>
    )
}

export default CredentialsTab;