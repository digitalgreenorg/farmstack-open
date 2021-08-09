import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import './ConnectorMap.css';

function ConnectorMap() {

    function handleResize() {
        // console.log('Window Width: ', window.innerWidth);
    }
    React.useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])
    return (
        <>
            <div className="provider__stack__container">
                <div className="provider__content" style={{marginRight: '500px'}}>
                    <Header size='medium'>Data Provider 1</Header>
                    <div className="provider__img__container">
                        <Image src='/images/spreadsheets-icon.png' />
                    </div>
                    <Header size='medium'>Farmer Produce Data</Header>
                    <p>farmstack/gsheets</p>
                </div>
                <div className="provider__content">
                    <Header size='medium'>Data Provider 2</Header>
                    <div className="provider__img__container">
                        <Image src='/images/mysql_logo.png' />
                    </div>
                    <Header size='medium'>Farmer Activity Data</Header>
                    <p>farmstack/MySQL</p>
                </div>
                <div className="horizontal__divider" style={{width: '670px'}}></div>
            </div>
            <div className="consumer__stack__container">
                <div className="provider__content">
                    <div className="provider__img__container">
                        <Image src='/images/node_logo.png' />
                    </div>
                    <Header size='medium'>Data Consumer NodeJS App</Header>
                    <p>farmstack/merge-aggreagate-app</p>
                    <button type="button" className="ui button fs-primary-outline-btn" style={{marginTop: '10px'}}>Process Data and View Result</button>
                </div>
            </div>
            {/* <div className="connector__map__component h_100_percent">
                <div className="ui fluid card h_100_percent">
                        <div className="content">
                            <div className="header">Route 1</div>
                            <div className="meta">This route is to combine data from a spreadsheet with a MySQL DB  while the data is joined based on a common ID and aggregated</div>
                        </div>
                        <div className="content">
                        </div>
                </div>
            </div> */}
        </>
    )
}

export default ConnectorMap;