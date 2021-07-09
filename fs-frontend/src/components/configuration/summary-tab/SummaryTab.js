import React, { useState } from 'react';
import './SummaryTab.css';

import {Transition} from 'semantic-ui-react';

/**
 * TODO: Advance settings smooth transition
*/
function SummaryTab() {
    const [parallelProcesses, setParallelProcesses] = useState(1);
    const [showAdvSettings, toggleAdvSettings] = useState(true)

    const handleParallelProcessing = (type) => {
        if (type === 'dec' && parallelProcesses === 1) { return; }
        else {
            (type === 'dec') ? setParallelProcesses(parallelProcesses - 1) : setParallelProcesses(parallelProcesses + 1);
        }
    }


    return (
        <>
            <div className="fs-component-container">
                <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
                    <path d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z M16,14H8v-2h8V14z M14,18H8v-2h6V18z M13,9V3.5 L18.5,9H13z"/>
                </svg>
                <div className="ui header">Google Spreadsheets</div>
                <p>farmstack/gspreadsheets</p>
            </div>
            <div className="ui vertical segment">
                <div className="ui header">Step Preferences</div>
            </div>
            <div className="ui vertical segment">
                <div className="step-wrapper">
                    <div className="step-left">Step Status</div>
                    <div className="step-right success">
                        <span><i aria-hidden="true" className="check circle icon" /></span>
                        <span>Successfully configured</span>
                    </div>
                </div>
            </div>
            <div className="ui vertical segment">
                <div className="step-wrapper">
                    <div className="step-left">Description</div>
                    <div className="step-right">
                        <span>Survey results</span>
                        <span><i aria-hidden="true" className="pencil icon" /></span>
                    </div>
                </div>
            </div>
            <div className="ui vertical segment">
                <div className="step-wrapper">
                    <div className="step-left">Credential</div>
                    <div className="step-right">
                        vineet@digitalgreen.org(vineet@digitalgreen.org)
                    </div>
                </div>
            </div>
            <div className="ui vertical segment" style={{borderBottom: 'none'}}>
                <div className="adv-set-trigger cursor__pointer" onClick={e => toggleAdvSettings(!showAdvSettings)}>
                    <span>{showAdvSettings ? 'Hide' : 'Show'} Advance Settings</span>&nbsp;
                    <span><i aria-hidden="true" className={`caret ${showAdvSettings ? 'up' : 'down'} icon`} /></span>
                </div>
            </div>
            <Transition visible={showAdvSettings} animation='fade' duration={500}>
                <div className="ui vertical segment">
                    <div className="step-wrapper">
                        <div className="step-left">Parallel Processing</div>
                        <div className="step-right">
                            <span className={`parallel-decrement ${(parallelProcesses > 1) ? 'cursor__pointer' : ''}`} onClick={e => handleParallelProcessing('dec')}>
                                <i aria-hidden="true" className="minus icon" />
                            </span>
                            <span className="parallel-value">{parallelProcesses.toLocaleString('en-US', {minimumIntegerDigits: 2})}</span>
                            <span className="parallel-increment cursor__pointer" onClick={e => handleParallelProcessing('inc')}>
                                <i aria-hidden="true" className="plus icon" />
                            </span>
                        </div>
                    </div>
                </div>
            </Transition>
        </>
    )
}

export default SummaryTab;