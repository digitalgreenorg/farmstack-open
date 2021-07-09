import React from 'react';
import './Flow.css'

function Flow() {
    return (
        <>
            <div className="ui container">
                <div className="ui fluid card">
                    <div className="content">
                        <div className="header">Give me a name</div>
                        <div className="meta">Please enter your flow description here</div>
                    </div>
                    <div className="content">
                        <div className="description">
                            <div className="fs-flow-content">
                                <button className="ui circular icon button">
                                    <i aria-hidden="true" className="plus icon" />
                                </button>
                                <p>Add the initial trigger</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Flow;
