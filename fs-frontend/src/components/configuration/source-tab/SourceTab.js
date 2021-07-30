import React, { useState } from 'react';
import { Form, Label } from 'semantic-ui-react';
import { useConfigurations } from '../../../contexts/ConfigurationsProvider';
import './SourceTab.css';


function SourceTab({nextStep}) {
    const [route, setRoute] = useState('');
    const [connector, setConnector] = useState('CSV');
    const [sourceDetails, setSourceDetails] = useState('');
    const [submitted, setSubmitted] = useState(false);
    
    // Get the exposed context function to update the context data
    const { updateConfigurationData } = useConfigurations();

    // Handle Form Submit
    function handleSubmit(e) {
        e.preventDefault(); // Prevent page to reload on form submit
        setSubmitted(true); // Set Form submission flag

        // Restrict Form Submission, if no data has been provded
        if (!route || !sourceDetails || !connector) return; 

        // Collect all the data of the form
        const sourceData = {
            route,
            connector,
            sourceDetails
        };

        updateConfigurationData({source: sourceData}); // Update the Context Data for the Source Tab
        nextStep('destination'); // Switch to the next Tab
    }
    return (
        <>
            <div className="source__tab__component">
                <Form onSubmit={handleSubmit}>
                    <div className={submitted && !route ? 'inline error field' : 'inline field'}>
                        <label>Route name</label>
                        <div className="ui input">
                            <input value={route} onChange={e => setRoute(e.target.value)} type="text" />
                        </div>
                        {submitted && !route && <Label basic color='red' pointing='left'>Please enter Route name.</Label>}
                    </div>
                    <div className={submitted && !connector ? 'inline error field' : 'inline field'}>
                        <label>Connector</label>
                        <select value={connector} onChange={e => setConnector(e.target.value)}>
                            <option value='CSV'>CSV</option>
                            <option value='GOOGLE_SHEET'>Google Sheet</option>
                            <option value='MYSQL'>MySQL</option>
                            <option value='ODK'>ODK</option>
                            <option value='POSTGRES'>PostGres</option>
                        </select>
                        {submitted && !connector && <Label basic color='red' pointing='left'>Please choose a Connector.</Label>}
                    </div>
                    <div className={submitted && !sourceDetails ? 'inline error field' : 'inline field'}>
                        <label>Source Details</label>
                        <div className="ui input">
                            <input value={sourceDetails} onChange={e => setSourceDetails(e.target.value)} type="text" />
                        </div>
                        {submitted && !sourceDetails && <Label basic color='red' pointing='left'>Please provide Source details.</Label>}
                    </div>
                    <div className="next__btn__container" style={{textAlign: 'right'}}>
                        <button type="submit" className="ui button fs-primary-outline-btn">Launch Connector</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default SourceTab;