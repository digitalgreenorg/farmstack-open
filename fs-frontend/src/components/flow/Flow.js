import React, { useEffect, useState } from 'react';
import './Flow.css';

import Configuration from '../configuration/Configuration';
import Modal from '../Modal/Modal';
import { Form, Label } from 'semantic-ui-react';
import { useConfigurations } from '../../contexts/ConfigurationsProvider';
import ConnectorMap from '../connector-map/ConnectorMap';

function Flow() {
    const { currentRoute, updateRoutes } = useConfigurations();
    const [modalOpen, setModalOpen] = useState(false);
    const [routeModal, setRouteModal] = useState(false);
    const [editRouteSubmitted, setEditRouteSubmitted] = useState(false);
    // Edit Route Details Form Data
    const [routeName, setRouteName] = useState('')
    const [routeDesc, setRouteDesc] = useState('')
    // Page Header Data
    const [currentRouteName, setCurrentRouteName] = useState('')
    const [currentRouteDesc, setCurrentRouteDesc] = useState('')
    const [ currentRouteData, setCurrentRouteData ] = useState()
    // const [finishedConfiguration, setfinishedConfiguration] = useState(false);

    // For handling Modal Close from Configuration Component
    const getConfigData = (configData) => {
        if (configData.closeModal && configData.closeModal === true) { 
            setModalOpen(false);
            // setfinishedConfiguration(true);
        }
    }

    function handleEditRouteSubmit(e) {
        e.preventDefault();
        setEditRouteSubmitted(true);

        if (!routeName || !routeDesc) { return; } // Do not update, if the fields are blank.
        setRouteModal(false)

        const routeData = {
            name: routeName,
            description: routeDesc
        }
        setCurrentRouteName(routeData.name)
        setCurrentRouteDesc(routeData.description)
        updateRoutes(routeData);
    }

    useEffect(() => {
        // Page Header Details
        setCurrentRouteName(currentRoute.route.name) 
        setCurrentRouteDesc(currentRoute.route.description)
        // Edit Form Details
        // setRouteName(currentRoute.route.name)
        // setRouteDesc(currentRoute.route.description)
        // Current Route Data 
        setCurrentRouteData(currentRoute.route.data)
    }, [setCurrentRouteDesc, setCurrentRouteName, currentRoute])

    return (
        <>
            <div className="fs-flow-component h_100_percent">
                
                <div className="ui container h_100_percent">
                    <div className="ui fluid card h_100_percent">
                        <div className="content">
                            <div className="header" onClick={() => { setEditRouteSubmitted(false); setRouteModal(true);}}>
                                <span aria-label="Click to edit Route" className="hint--right cursor__pointer">{currentRouteName}</span>
                            </div>
                            <div className="meta route__description">{currentRouteDesc}</div>
                        </div>
                        <div className="content">

                            {
                                currentRouteData ? (
                                    <ConnectorMap />
                                ) : (
                                    <div className="description">
                                        <div className="fs-flow-content">
                                            <div className="add-provider-container" onClick={() => setModalOpen(true)}>
                                                <i aria-hidden="true" className="plus icon" />
                                                <p>Initialize a provider</p>
                                            </div>
                                            <p>Add a provider connector to get started</p>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>

                </div>

                {
                    modalOpen && <Modal close={e => setModalOpen(false)} header={'Configuration'}>
                        <Configuration getConfigData={getConfigData} />
                    </Modal>
                }

                {
                    routeModal && <Modal close={e => setRouteModal(false)} header={'Edit Route'} width="650px">
                        <div className="edit__routeModal" style={{padding: '10px'}}>
                            <Form onSubmit={handleEditRouteSubmit}>
                                <div className={editRouteSubmitted && !routeName ? 'error field' : 'field'}>
                                    <label>Route name</label>
                                    <div className="ui input">
                                        <input type="text" placeholder="Unnamed Route" value={routeName} onChange={e => setRouteName(e.target.value)} />
                                    </div>
                                    {editRouteSubmitted && !routeName && <Label basic color='red' pointing>Please enter Route name.</Label>}
                                </div>
                                <div className={editRouteSubmitted && !routeDesc ? 'error field' : 'field'}>
                                    <label>Route Description</label>
                                    <div className="ui input">
                                        <textarea
                                            rows={3}
                                            placeholder="Add description about your route"
                                            value={routeDesc}
                                            onChange={e => setRouteDesc(e.target.value)}
                                        />
                                    </div>
                                    {editRouteSubmitted && !routeDesc && <Label basic color='red' pointing>Please enter Route description.</Label>}
                                </div>
                                <div className="next__btn__container" style={{textAlign: 'right'}}>
                                    <button type="submit" className="ui button fs-primary-outline-btn">Update</button>
                                </div>
                            </Form>
                        </div>
                    </Modal>
                }


            </div>
        </>
    )
}

export default Flow;
