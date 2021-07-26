import React, { createContext, useContext, useState } from 'react';

const ConfigurationContext = createContext();

export function useConfigurations() {
    return useContext(ConfigurationContext);
}

export function ConfigurationsProvider({children}) {
    const [configurationData, setConfigurationData] = useState({
        components: null,
        credentials: null,
        input: null,
        sample: null,
        summary: null
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