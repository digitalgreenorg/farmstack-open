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
                    {
                        routesList.map((route, index) => {
                            return (
                                <div key={route.id} className="route__content cursor__pointer" onClick={() => handleRouteSelect(index)}>
                                    <Header size='small' >{route.name}</Header>
                                </div>
                            )
                        })
                    }
                    <div className="new__route__content">
                        <button className="ui large button newRoute__Btn" onClick={createNewRoute}>
                            <span><i aria-hidden="true" className="plus icon" /></span> New Route
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}