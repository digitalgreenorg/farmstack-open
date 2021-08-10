import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import './ConnectorMap.css';
import sheetIco from '../../assets/images/spreadsheets-icon.png';
import mySqlLogo from '../../assets/images/mysql_logo.png';
import nodeLogo from '../../assets/images/node_logo.png';


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
                <div className="provider__content">
                    <Header size='medium'>Data Provider 1</Header>
                    <div className="provider__img__container">
                        <Image src={sheetIco} />
                    </div>
                    <Header size='medium'>Farmer Produce Data</Header>
                    <p>farmstack/gsheets</p>
                </div>
                <div className="provider__content">
                    <Header size='medium'>Data Provider 2</Header>
                    <div className="provider__img__container">
                        <Image src={mySqlLogo} />
                    </div>
                    <Header size='medium'>Farmer Activity Data</Header>
                    <p>farmstack/MySQL</p>
                </div>
            </div>
            <div className="consumer__stack__container">
                <div className="provider__content">
                    <div className="provider__img__container">
                        <Image src={nodeLogo} />
                    </div>
                    <Header size='medium'>Data Consumer NodeJS App</Header>
                    <p>farmstack/merge-aggreagate-app</p>
                    <button type="button" className="ui button fs-primary-outline-btn" style={{marginTop: '10px'}}>Process Data and View Result</button>
                </div>
            </div>
        </>
    )
}

export default ConnectorMap;