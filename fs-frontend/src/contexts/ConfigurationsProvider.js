import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

    const [routes, setRoutes] = useState([
        {
            id: uuidv4(),
            name: 'Unnamed Route',
            description: 'Add description about your route',
            data: null
        },
        {
            id: uuidv4(),
            name: 'Route 2',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, incidunt.',
            data: {
                "source": {
                  "route": "demo route",
                  "connector": "CSV",
                  "sourceDetails": "demo source details"
                },
                "destination": {
                  "pairConnector": "demo pair connector"
                },
                "policyConfig": {
                  "timeSeriesData": true,
                  "anayticsData": true
                }
            }
        },
        {
            id: uuidv4(),
            name: 'Route 3',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, incidunt.',
            data: null
        }
    ])

    function updateRoutes(routeData) {
        const updatedRouteData = { ...currentRoute.route, ...routeData }
        const updatedRoutes = [...routes];
        updatedRoutes[currentRoute.index] = updatedRouteData
        setRoutes(updatedRoutes)
    }

    const [currentRoute, setCurrentRoute] = useState({index: routes.length - 1, route: routes[routes.length - 1]})

    function selectRoute(routeIndex) {
        setCurrentRoute({index: routeIndex, route: routes[routeIndex]})
    }

    function updateConfigurationData(configData) {
        console.log('Config Data: ', configData)
        const updatedConfigData = {...configurationData, ...configData};
        // setConfigurationData(prevConfigurationData => {
        //     return {...prevConfigurationData, ...configData}
        // });
        setConfigurationData(updatedConfigData);



    }

    const configurationValue = {
        configurationData,
        updateConfigurationData,
        routes, currentRoute,
        selectRoute, updateRoutes
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