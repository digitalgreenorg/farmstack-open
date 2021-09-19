import React, { useRef } from 'react';
import { Form, Header, Image } from 'semantic-ui-react';
import Checkbox from '../../Checkbox/Checkbox';
import './ConfigurePolicyTab.css';
import nodeLogo from '../../../assets/images/node_logo.png';


function ConfigurePolicyTab({nextStep, collectData, stepData: { policyConfig }}) {
    const timeSeriesDataRef = useRef();
    const combinedAnalyticsDataRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        const policyData = {
            timeSeriesData: timeSeriesDataRef.current.checked,
            anayticsData: combinedAnalyticsDataRef.current.checked
        }

        collectData({policyConfig: policyData});
        nextStep('finish');

    }

    return (
        <>
            <div className="configurepolicy__tab__component">
                <Header size='tiny'>Configure Usage Policy</Header>
                <div className="ui block header">
                    <Image src={nodeLogo} circular />
                    Merge Aggregate App
                </div>
                <Header size='tiny'>Select Output Files</Header>
                <Form onSubmit={handleSubmit}>
                    <div className="output__file__option">
                        <Checkbox ref={timeSeriesDataRef} label="Time Series Data" isChecked={policyConfig ? policyConfig.timeSeriesData : false} />
                        <p>Number of farmers by date for state, districts and villages and produce details</p>
                    </div>
                    <div className="output__file__option">
                        <Checkbox ref={combinedAnalyticsDataRef} label="Combined Analytics Data" isChecked={policyConfig ? policyConfig.anayticsData : false} />
                        <p>Number of farmers who watched the video and their produce details </p>
                    </div>
                    <div className="next__btn__container" style={{textAlign: 'right'}}>
                        <button type="submit" className="ui button fs-primary-outline-btn" style={{marginTop: '20px'}}>Finish Step</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default ConfigurePolicyTab;