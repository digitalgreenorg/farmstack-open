import React, { createContext, useContext, useState } from 'react';

const ConfigurationContext = createContext();

export function useConfigurations() {
    return useContext(ConfigurationContext);
}

export function ConfigurationsProvider({children}) {
    const [configurationData, setConfigurationData] = useState({
        source: null,
        destination: null,
        policyConfig: null
    });

    function updateConfigurationData(configData) {
        setConfigurationData(prevConfigurationData => {
            return {...prevConfigurationData, ...configData}
        });
    }

    const configurationValue = {
        configurationData,
        updateConfigurationData
    };

    /*
        *   For Testing Configuration Data 
        *   Can be used in future for persistence Data
    */
    // React.useEffect(() => {
    //     localStorage.setItem('FARMSTACK_configurationData', JSON.stringify(configurationData));
    // }, [configurationData])

    return (
        <ConfigurationContext.Provider value={configurationValue}>
            {children}
        </ConfigurationContext.Provider>
    )
}