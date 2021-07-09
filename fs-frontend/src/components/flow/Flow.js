import React from 'react';
import './Flow.css';
import Rodal from 'rodal';

import Configuration from '../configuration/Configuration';


function Flow() {
    const [open, setOpen] = React.useState(false);
    const getConfigData = (configData) => {
        // console.log('Configuration Tab Data: ', configData);
        if (configData.closeModal && configData.closeModal === true) { setOpen(false); }
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
                                    <button className="ui circular icon button fs-primary-outline-btn fs_mb_10" onClick={e => setOpen(true)}>
                                        <i aria-hidden="true" className="plus icon" />
                                    </button>
                                    <p>Add the initial trigger</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Rodal visible={open} onClose={e => setOpen(false)}>
                    <Configuration getConfigData={getConfigData} />
                </Rodal>

            </div>
        </>
    )
}

export default Flow;
