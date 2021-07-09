import React from 'react';
import ComponentsTab from '../components-tab/ComponentsTab';
import CredentialsTab from '../credentials-tab/CredentialsTab';
import InputTab from '../input-tab/InputTab';
import SampleTab from '../sample-tab/SampleTab';
import SummaryTab from '../summary-tab/SummaryTab';

function ConfigTabs({tabName}) {
    switch(tabName) {
        case 'components':
            return <ComponentsTab />;
            case 'versions':
                return (
                    <>
                        <p>Versions</p>
                    </>
            );
            case 'functions':
                return (
                    <>
                        <p>Functions</p>
                    </>
            );
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
}

export default ConfigTabs;