import React, { useRef } from 'react';
import { Form } from 'semantic-ui-react';
import { useConfigurations } from '../../../contexts/ConfigurationsProvider';
import './SourceTab.css';


function SourceTab({nextStep}) {
    // Get all the references of the form fields
    const routeRef = useRef();
    const connectorRef = useRef();
    const sourceDetailsRef = useRef();
    
    // Get the exposed context function to update the context data
    const { updateConfigurationData } = useConfigurations();

    // Handle Form Submit
    function handleSubmit(e) {
        e.preventDefault(); // Prevent page to reload on form submit

        // Collect all the data of the form
        const sourceData = {
            route: routeRef.current.value,
            connector: connectorRef.current.value,
            sourceDetails: sourceDetailsRef.current.value
        };

        updateConfigurationData({source: sourceData}); // Update the Context Data for the Source Tab
        nextStep('destination'); // Switch to the next Tab
    }
    return (
        <>
            <div className="source__tab__component">
                <Form onSubmit={handleSubmit}>
                    <div className="inline field">
                        <label>Route name</label>
                        <div className="ui input">
                            <input ref={routeRef} type="text" />
                        </div>
                    </div>
                    <div className="inline field">
                        <label>Connector</label>
                        <select ref={connectorRef}>
                            <option value='CSV'>CSV</option>
                            <option value='GOOGLE_SHEET'>Google Sheet</option>
                            <option value='MYSQL'>MySQL</option>
                            <option value='ODK'>ODK</option>
                            <option value='POSTGRES'>PostGres</option>
                        </select>
                    </div>
                    <div className="inline field">
                        <label>Source Details</label>
                        <div className="ui input">
                            <input ref={sourceDetailsRef} type="text" />
                        </div>
                    </div>
                    <button type="submit" className="ui button fs-primary-outline-btn" style={{marginTop: '20px', marginLeft: '110px'}}>Launch Connector</button>
                </Form>
            </div>
        </>
    )
}

export default SourceTab;