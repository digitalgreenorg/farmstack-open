import React, { useRef, useState } from 'react';
import { Form, Image } from 'semantic-ui-react';
import './DestinationTab.css';

function DestinationTab({nextStep}) {
    const pairConnectorRef = useRef();
    const [showLoader, setShowLoader] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    function handleSubmit(e, param) {
        e.preventDefault();

        if (param === 'Continue') {
            setShowLoader(true);
            setTimeout(() => {
                setDataLoaded(true);
                setShowLoader(false)
            }, 1000);
        }

        if (param === 'Connect') {
            nextStep('policyConfig');
        }
    }

    const loader = () => {
        return (
            <div className="ui active transition visible inverted dimmer">
                <div className="content">
                    <div className="ui inverted text loader">Loading</div>
                </div>
            </div>
        )
    };
    return (
        <>
            <div className="destination__tab__component">
                {showLoader && loader()}
                <Form>
                    <div className="inline field">
                        <label>Pair Connector</label>
                        <div className="ui input">
                            <input ref={pairConnectorRef} type="text" />
                        </div>
                    </div>

                    {dataLoaded && (
                        <div className="other__destination__details">
                            <div className="destination__dg__image">
                                <Image src='/images/destination_dg.png' circular />
                            </div>
                            <div className="owner__details">
                                <p className="ui header">Owner</p>
                                <p>Digital Green Foundation</p>
                            </div>
                            <div className="merge__app__details">
                                <p className="ui block header">Merge Aggregate App</p>
                                <p>
                                    Merge app merges the sample farmer data which has details of produce with the adoption data...
                                    <strong>READ MORE</strong>
                                </p>
                            </div>
                        </div>
                    )}

                    <button onClick={e => handleSubmit(e, dataLoaded ? 'Connect' : 'Continue')} type="button" className="ui button fs-primary-outline-btn" style={{marginTop: '20px', marginLeft: '110px'}}>
                        {dataLoaded ? 'Connect' : 'Continue'}
                    </button>
                </Form>
            </div>
        </>
    )
}

export default DestinationTab;