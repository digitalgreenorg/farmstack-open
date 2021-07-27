import React from 'react';
import { Header } from 'semantic-ui-react';
import './Sidebar.css';

export default function Sidebar() {
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
                    <div className="route__content">
                        <Header size='medium' disabled>Route 1</Header>
                    </div>
                    <div className="route__content">
                        <Header size='medium' >Route 2</Header>
                    </div>
                    <div className="new__route__content">
                        <button type="button" className="ui button fs-primary-outline-btn">
                            {/* <Header size='medium' >New Route</Header> */}
                            New Route
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}