import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import './ConnectorMap.css';
import mySqlLogo from '../../assets/images/mysql_logo.png';
import nodeLogo from '../../assets/images/node_logo.png';
import csv from '../../assets/images/csv_ico.svg';
import gsheet from '../../assets/images/gsheet_ico.svg';
import vector from '../../assets/images/Vector.png';
import postgres from '../../assets/images/postgresql-ico.svg';
import odk from '../../assets/images/odk_logo.svg';


function ConnectorMap({currentRoute}) {

    function handleResize() {
        // console.log('Window Width: ', window.innerWidth);
    }

    function selectedProvider() {
        const connector = currentRoute.route.data?.source?.connector;
        switch(connector) {
            case 'CSV':
                return csv
            case 'GOOGLE_SHEET':
                return gsheet
            case 'POSTGRES':
                return postgres
            case 'MYSQL':
                return mySqlLogo
            case 'ODK':
                return odk
            default:
                return vector
        }
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
                        <Image src={selectedProvider()} />
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