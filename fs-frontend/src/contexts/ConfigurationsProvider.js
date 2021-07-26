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

    return (
        <ConfigurationContext.Provider value={configurationValue}>
            {children}
        </ConfigurationContext.Provider>
    )
}