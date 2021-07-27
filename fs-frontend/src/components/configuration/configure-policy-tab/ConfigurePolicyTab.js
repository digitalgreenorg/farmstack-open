import React, { useRef } from 'react';
import { Form, Header, Image } from 'semantic-ui-react';
import { useConfigurations } from '../../../contexts/ConfigurationsProvider';
import Checkbox from '../../Checkbox/Checkbox';
import './ConfigurePolicyTab.css';


function ConfigurePolicyTab({nextStep}) {
    const timeSeriesDataRef = useRef();
    const combinedAnalyticsDataRef = useRef();
    const { updateConfigurationData } = useConfigurations();

    function handleSubmit(e) {
        e.preventDefault();

        const policyData = {
            timeSeriesData: timeSeriesDataRef.current.checked,
            anayticsData: combinedAnalyticsDataRef.current.checked
        }

        updateConfigurationData({policyConfig: policyData});
        nextStep('finish');

    }

    return (
        <>
            <div className="configurepolicy__tab__component">
                <Header size='tiny'>Configure Usage Policy</Header>
                <div className="ui block header">
                    <Image src='/images/node_logo.png' circular />
                    Merge Aggregate App
                </div>
                <Header size='tiny'>Select Output Files</Header>
                <Form onSubmit={handleSubmit}>
                    <div className="output__file__option">
                        <Checkbox ref={timeSeriesDataRef} label="Time Series Data"/>
                        <p>Number of farmers by date for state, districts and villages and produce details</p>
                    </div>
                    <div className="output__file__option">
                        <Checkbox ref={combinedAnalyticsDataRef} label="Combined Analytics Data"/>
                        <p>Number of farmers who watched the video and their produce details </p>
                    </div>
                    <button type="submit" className="ui button fs-primary-outline-btn" style={{marginTop: '20px'}}>Finish Step</button>
                </Form>
            </div>
        </>
    )
}

export default ConfigurePolicyTab;