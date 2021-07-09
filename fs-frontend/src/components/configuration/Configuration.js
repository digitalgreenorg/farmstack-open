import React, { useState } from 'react';
import './Configuration.css';
import ConfigTabs from './config-tabs/ConfigTabs';

/**
 * TODO: Completed Steps Design
*/
function Configuration() {
    const [activePane, setActivePane] = useState('components');

    const changeTab = (tabName) => {
        setActivePane(tabName);
    }

    return (
        <>
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
                                    <div className={`step cursor__pointer ${activePane === 'components' ? 'active' : ''}`} onClick={e => changeTab('components')}>
                                        <div className="content">
                                            <div className="title">Step 1</div>
                                            <div className="description">Components</div>
                                        </div>
                                    </div>
                                    <div className={`step cursor__pointer ${activePane === 'versions' ? 'active' : ''}`} onClick={e => changeTab('versions')}>
                                        <div className="content">
                                            <div className="title">Step 2</div>
                                            <div className="description">Versions</div>
                                        </div>
                                    </div>
                                    <div className={`step cursor__pointer ${activePane === 'functions' ? 'active' : ''}`} onClick={e => changeTab('functions')}>
                                        <div className="content">
                                            <div className="title">Step 3</div>
                                            <div className="description">Functions</div>
                                        </div>
                                    </div>
                                    <div className={`step cursor__pointer ${activePane === 'credentials' ? 'active' : ''}`} onClick={e => changeTab('credentials')}>
                                        <div className="content">
                                            <div className="title">Step 4</div>
                                            <div className="description">Credentials</div>
                                        </div>
                                    </div>
                                    <div className={`step cursor__pointer ${activePane === 'input' ? 'active' : ''}`} onClick={e => changeTab('input')}>
                                        <div className="content">
                                            <div className="title">Step 5</div>
                                            <div className="description">Input</div>
                                        </div>
                                    </div>
                                    <div className={`step cursor__pointer ${activePane === 'sample' ? 'active' : ''}`} onClick={e => changeTab('sample')}>
                                        <div className="content">
                                            <div className="title">Step 6</div>
                                            <div className="description">Sample</div>
                                        </div>
                                    </div>
                                    <div className={`step cursor__pointer ${activePane === 'summary' ? 'active' : ''}`} onClick={e => changeTab('summary')}>
                                        <div className="content">
                                            <div className="title">Step 7</div>
                                            <div className="description">Summary</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ui attached segment">
                                    <ConfigTabs tabName={activePane} />
                                    {
                                        ['input', 'sample', 'summary'].includes(activePane) && (
                                            <div className="step-change-btn-wrapper">
                                                <button className="ui icon button">
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
        </>
    )
}

export default Configuration;