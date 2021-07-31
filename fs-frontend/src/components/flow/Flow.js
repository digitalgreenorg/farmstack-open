import React, { useState } from 'react';
import './Flow.css';

import Configuration from '../configuration/Configuration';
import Modal from '../Modal/Modal';

// import { useConfigurations } from '../../contexts/ConfigurationsProvider';

function Flow() {
    const [modalOpen, setModalOpen] = useState(false);
    // const [finishedConfiguration, setfinishedConfiguration] = useState(false);
    // const { configurationData } = useConfigurations();

    // For handling Modal Close from Configuration Component
    const getConfigData = (configData) => {
        if (configData.closeModal && configData.closeModal === true) { 
            setModalOpen(false);
            // setfinishedConfiguration(true);
        }
    }



    return (
        <>
            <div className="fs-flow-component h_100_percent">
                
                <div className="ui container h_100_percent">
                    <div className="ui fluid card h_100_percent">
                        <div className="content">
                            <div className="header">Give me a name</div>
                            <div className="meta">Please enter your flow description here</div>
                        </div>
                        <div className="content">

                            <div className="description">
                                <div className="fs-flow-content">
                                    <div className="add-provider-container" onClick={e => setModalOpen(true)}>
                                        <i aria-hidden="true" className="plus icon" />
                                        <p>Initialize a provider</p>
                                    </div>
                                    <p>Add a provider connector to get started</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <Modal open={modalOpen} close={e => setModalOpen(false)} header={'Configuration'}>
                    <Configuration getConfigData={getConfigData} />
                </Modal>


            </div>
        </>
    )
}

export default Flow;
