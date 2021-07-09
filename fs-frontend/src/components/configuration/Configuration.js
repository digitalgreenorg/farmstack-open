import React, { useState } from 'react';
import './Configuration.css';
import ComponentsTab from './components-tab/ComponentsTab';
import CredentialsTab from './credentials-tab/CredentialsTab';
import InputTab from './input-tab/InputTab';
import SampleTab from './sample-tab/SampleTab';
import SummaryTab from './summary-tab/SummaryTab';

function Configuration({getConfigData}) {
    const [activePane, setActivePane] = useState('components');

    const getComponentTabData = (componentData) => {
        // console.log('Component Tab Data: ', componentData);
        setActivePane('credentials');
    }

    const clickChangeTab = () => {
        if (['input', 'sample', 'summary'].includes(activePane)) {
            switch(activePane) {
                case 'input':
                    setActivePane('sample');
                    break;
                case 'sample':
                    setActivePane('summary');
                    break;
                case 'summary':
                    getConfigData({closeModal: true});
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <>
            <div className="fs-configuration-container">

                <div className="ui container">
                    <div className="ui fluid card">
                        <div className="content">
                            <div className="header">Setup this step configuration</div>
                            <div className="meta">Fill in the required information for the given step.</div>
                        </div>
                        <div className="content">
                            <div className="description">
                                <div className="fs-conf-content">
                                    <div className="ui tablet stackable top attached fluid steps">
                                        <div className={`step cursor__pointer ${activePane === 'components' ? 'active' : ''}`} onClick={e => setActivePane('components')}>
                                            <div className="content">
                                                <div className="title">Step 1</div>
                                                <div className="description">Components</div>
                                            </div>
                                        </div>
                                        <div className={`step cursor__pointer ${activePane === 'credentials' ? 'active' : ''}`} onClick={e => setActivePane('credentials')}>
                                            <div className="content">
                                                <div className="title">Step 2</div>
                                                <div className="description">Credentials</div>
                                            </div>
                                        </div>
                                        <div className={`step cursor__pointer ${activePane === 'input' ? 'active' : ''}`} onClick={e => setActivePane('input')}>
                                            <div className="content">
                                                <div className="title">Step 3</div>
                                                <div className="description">Input</div>
                                            </div>
                                        </div>
                                        <div className={`step cursor__pointer ${activePane === 'sample' ? 'active' : ''}`} onClick={e => setActivePane('sample')}>
                                            <div className="content">
                                                <div className="title">Step 4</div>
                                                <div className="description">Sample</div>
                                            </div>
                                        </div>
                                        <div className={`step cursor__pointer ${activePane === 'summary' ? 'active' : ''}`} onClick={e => setActivePane('summary')}>
                                            <div className="content">
                                                <div className="title">Step 5</div>
                                                <div className="description">Summary</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="ui attached segment">
                                        {
                                            (() => {
                                                switch(activePane) {
                                                    case 'components':
                                                        return <ComponentsTab sendCompData={getComponentTabData}/>;
                                                        case 'credentials':
                                                            return <CredentialsTab />;
                                                        case 'input':
                                                            return <InputTab />;
                                                        case 'sample':
                                                            return <SampleTab />;
                                                        case 'summary':
                                                            return <SummaryTab />;
                                                    default:
                                                        return <></>
                                                }
                                            })()
                                        }
                                        {
                                            ['input', 'sample', 'summary'].includes(activePane) && (
                                                <div className="step-change-btn-wrapper">
                                                    <button className="ui icon button" onClick={clickChangeTab}>
                                                        {activePane !== 'summary' ? 'Continue' : 'Finish step'}
                                                    </button>
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