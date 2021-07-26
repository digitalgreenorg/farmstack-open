import React, { useState } from 'react';
import './SampleTab.css';
import { useConfigurations } from '../../../contexts/ConfigurationsProvider';

function SampleTab({nextStep}) {
    const {updateConfigurationData} = useConfigurations();

    const updateSampleData = (sampleData) => {
        setSelctedSample(sampleData)
        updateConfigurationData({sample: sampleData});
    }

    const [selectedSample, setSelctedSample] = useState(null)

    const samples = [
        {
            key: 'sample1',
            sampleName: 'ABC',
            sampleTimestamp: 4985938457893,
            sampleDesc: 'Lorem ipsum dolor sit amet.'
        },
        {
            key: 'sample2',
            sampleName: 'ABC',
            sampleTimestamp: 3456873458345,
            sampleDesc: 'Lorem ipsum dolor sit amet.'
        },
        {
            key: 'sample3',
            sampleName: 'ABC',
            sampleTimestamp: 7823842384734,
            sampleDesc: 'Lorem ipsum dolor sit amet.'
        }
    ];
    return (
        <>
            <div className="ui vertical segment" style={{borderBottom: 'none'}}>
                <div className="fs-sample-overview-header">
                    <button className="ui circular icon button">
                        <i aria-hidden="true" className="chevron left icon" />
                    </button>
                    <h3>Samples Overview</h3>
                </div>
            </div>
            <div className="fs-sample-container">
                <div className="ui vertical segment">
                    <div className="fs-sample-header">
                        <div className="header-prev cursor__pointer">
                            <span><i aria-hidden="true" className="chevron left icon" /></span>
                            <span>Previous</span>    
                        </div>
                        <div>Sample #1 of 15</div>
                        <div className="header-next cursor__pointer">
                            <span>Next</span>
                            <span><i aria-hidden="true" className="chevron right icon" /></span>
                        </div>
                    </div>
                </div>
                <div className="ui vertical segment">
                    <div className="fs-sample-secondary-header">
                        <div className="secondary-header-content cursor__pointer">
                            <span>Edit</span>
                            <span><i aria-hidden="true" className="pencil icon" /></span>
                        </div>
                        <div className="secondary-header-content cursor__pointer">
                            <span><i aria-hidden="true" className="check icon" /></span>
                            <span>In Use</span>
                        </div>
                    </div>
                </div>
                <div className="ui vertical segment">
                    <div className="fs-sample-content">
                        <div className="fs-sample-name">ABC</div>
                        <div className="fs-sample-timestamp">Timestamp</div>
                        <div className="fs-sample-description">FarmStack can be used to manage</div>
                    </div>
                </div>
                {
                    samples.map(sample => {
                        return (
                            <div className={`ui vertical segment cursor__pointer fs-sample ${selectedSample && selectedSample.key === sample.key ? 'active' : ''}`} key={sample.key} onClick={e => updateSampleData(sample)}>
                                <div className="fs-sample-content">
                                    <div className="fs-sample-name">{sample.sampleName}</div>
                                    <div className="fs-sample-timestamp">{sample.sampleTimestamp}</div>
                                    <div className="fs-sample-description">{sample.sampleDesc}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="step-change-btn-wrapper">
                <button className="ui icon button fs-primary-outline-btn" onClick={e => nextStep('summary')}>Continue</button>
            </div>
        </>
    )
}

export default SampleTab;