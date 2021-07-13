import React from 'react';
import './CredentialsTab.css';
import { useConfiguration } from '../../flow/Flow';

function CredentialsTab() {
    const {updateConfigurationData} = useConfiguration();

    const updateCredentialsData = (credData) => {
        updateConfigurationData({credentials: credData});
    }
    return (
        <>
            <div className="fs-credentials-tab-content">
                <div className="fs-credentials-tab-content-top">
                    <div className="ui left icon input fs-credentials-search">
                        <input type="text" placeholder="Search credential..." />
                        <i aria-hidden="true" className="search icon" />
                    </div>
                    <div className="fs-credentials-btn-container-1">
                        <button className="ui icon button fluid">
                            <i aria-hidden="true" className="plus icon" />&nbsp;
                            Add New Credential
                        </button>
                    </div>
                </div>
                <div className="fs-credentials-tab-content-body">

                    <div className="fs-credential-icon-container pos__rel">
                        <i aria-hidden="true" className="list ul icon" />
                        <span className="fs-credentials-count">0</span>
                    </div>
                    <div className="content">
                        <div className="header">You don't have any credentials yet.</div>
                        <div className="meta">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, facere?</div>
                    </div>
                    <button className="ui icon button" onClick={() => updateCredentialsData('Credentials Added')}>
                        <i aria-hidden="true" className="plus icon" />&nbsp;
                        Add New Credential
                    </button>
                </div>
            </div>
        </>
    )
}

export default CredentialsTab;