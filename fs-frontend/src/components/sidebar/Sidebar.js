import React, { useEffect, useState } from 'react';
import { Header } from 'semantic-ui-react';
import { useConfigurations } from '../../contexts/ConfigurationsProvider';
import './Sidebar.css';

export default function Sidebar() {
    const { routes, selectRoute, createNewRoute } = useConfigurations();
    const [routesList, setRoutesList] = useState([])

    function handleRouteSelect(index) {
        selectRoute(index);
    }

    useEffect(() => {
        setRoutesList(routes)
    }, [setRoutesList, routes]);

    return (
        <>
            <div className="sidebar__component">
                <Header as='h2'>Active Routes</Header>
                <div className="routes__list__container">
                    {/* <div className="route__container">
                        <div className="route__angle"></div>
                        <div className="route__content">
                            <Header size='medium' disabled>Route 1</Header>
                        </div>
                    </div> */}
                    {/* <div className="route__content">
                        <Header size='medium' disabled>Route 1</Header>
                    </div>
                    <div className="route__content">
                        <Header size='medium' >Route 2</Header>
                    </div>
                    <div className="new__route__content">
                        <button type="button" className="ui button fs-primary-outline-btn">New Route</button>
                    </div> */}
                    {
                        routesList.map((route, index) => {
                            return (
                                <div key={route.id} className="route__content cursor__pointer" onClick={() => handleRouteSelect(index)}>
                                    <Header size='medium' >{route.name}</Header>
                                </div>
                            )
                        })
                    }
                    {/* <div className="new__route__content">
                        <button type="button" className="button button--anthe"><span>New Route</span></button>
                        <div class="button2">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            HOVER ME
                        </div>
                        
                        <div className="route__content cursor__pointer pos__rel btn-3">
                        <Header size='medium' >Name</Header>
                        </div>
                        
                    </div> */}
                    <div className="new__route__content">
                        <button className="custom-btn btn-3" onClick={createNewRoute}>
                            <span>New Route</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}