import React, { useState } from 'react';
import './Configuration.css';
import ComponentsTab from './components-tab/ComponentsTab';
import CredentialsTab from './credentials-tab/CredentialsTab';
import InputTab from './input-tab/InputTab';
import SampleTab from './sample-tab/SampleTab';
import SummaryTab from './summary-tab/SummaryTab';

// const STEPS = [
//     'componentsStep', 'credentialsStep', 'inputStep', 'sampleStep', 'summaryStep'
// ]

function Configuration({getConfigData}) {
    const [activePane, setActivePane] = useState('components');
    // const [completedSteps, setCompletedSteps] = useState([]);

    const switchToNextStep = (stepName) => {
        setActivePane(stepName);

        // console.log('Panes: ', document.querySelector('.fs-conf-content .ui.steps').children)
        // setTimeout(() => {
        //     console.log('Previous Panes: ', document.querySelector('.fs-conf-content .ui.steps .step.active').previousSibling)
        // }, 100)
    }

    const finishedChanges = () => {
        setActivePane('components')
        getConfigData({closeModal: true});
    }

    return (
        <>
            <div className="fs-configuration-container">

                <div className="ui container">
                    <div className="ui fluid card">
                        <div className="content component-config-header pos__rel">
                            <div className="component-config-header-img">
                                {
                                    activePane !== 'components' ? (
                                        <img src="/images/spreadsheets-icon.png" alt="component_default" />
                                    ) : (
                                        <img src="/images/Vector.png" alt="component_default" />
                                    )
                                }
                            </div>
                            <div className="header">Creating a Connection</div>
                            <div className="meta">Step by step process to guide you through adding your own container</div>
                        </div>
                        <div className="content">
                            <div className="description">
                                <div className="fs-conf-content">
                                    <div className="ui tablet stackable top attached fluid steps">
                                        <div className={`componentsTab step cursor__pointer ${activePane === 'components' ? 'active' : ''}`} onClick={e => switchToNextStep('components')}>
                                            {/* {completedSteps.includes('componentsTab') && <img src="/images/Completed.png" alt="" />} */}
                                            <div className="content">
                                                <div className="title">Step 1</div>
                                                <div className="description">Components</div>
                                            </div>
                                        </div>
                                        <div className={`credentialsTab step cursor__pointer ${activePane === 'credentials' ? 'active' : ''}`} onClick={e => switchToNextStep('credentials')}>
                                            {/* {completedSteps.includes('credentialsTab') && <img src="/images/Completed.png" alt="" />} */}
                                            <div className="content">
                                                <div className="title">Step 2</div>
                                                <div className="description">Credentials</div>
                                            </div>
                                        </div>
                                        <div className={`inputTab step cursor__pointer ${activePane === 'input' ? 'active' : ''}`} onClick={e => switchToNextStep('input')}>
                                            {/* {completedSteps.includes('inputTab') && <img src="/images/Completed.png" alt="" />} */}
                                            <div className="content">
                                                <div className="title">Step 3</div>
                                                <div className="description">Input</div>
                                            </div>
                                        </div>
                                        <div className={`sampleTab step cursor__pointer ${activePane === 'sample' ? 'active' : ''}`} onClick={e => switchToNextStep('sample')}>
                                            {/* {completedSteps.includes('sampleTab') && <img src="/images/Completed.png" alt="" />} */}
                                            <div className="content">
                                                <div className="title">Step 4</div>
                                                <div className="description">Sample</div>
                                            </div>
                                        </div>
                                        <div className={`summaryTab step cursor__pointer ${activePane === 'summary' ? 'active' : ''}`} onClick={e => switchToNextStep('summary')}>
                                            {/* {completedSteps.includes('summaryTab') && <img src="/images/Completed.png" alt="" />} */}
                                            <div className="content">
                                                <div className="title">Step 5</div>
                                                <div className="description">Summary</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ui attached segment">
                                        {
                                            {
                                                components: <ComponentsTab nextStep={switchToNextStep}/>,
                                                credentials: <CredentialsTab nextStep={switchToNextStep}/>,
                                                input: <InputTab nextStep={switchToNextStep}/>,
                                                sample: <SampleTab nextStep={switchToNextStep}/>,
                                                summary: <SummaryTab />
                                            }[activePane]
                                        }
                                        {
                                            (activePane === 'summary') && (
                                                <div className="step-change-btn-wrapper">
                                                    <button className="ui icon button fs-primary-outline-btn" onClick={finishedChanges}>Finish step</button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Configuration;