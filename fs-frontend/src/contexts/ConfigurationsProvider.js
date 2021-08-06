import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ConfigurationContext = createContext();

export function useConfigurations() {
    return useContext(ConfigurationContext);
}

export function ConfigurationsProvider({children}) {
    const [routeAdded, setRouteAdded] = useState(false)
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

    function createNewRoute() {
        const newRoute = {
            id: uuidv4(),
            name: 'Unnamed Route',
            description: 'Add description about your route',
            data: null
        }

        const updatedRoutes = [...routes];
        updatedRoutes.push(newRoute);
        setRoutes(updatedRoutes)
        setRouteAdded(true)
    }

    function updateRoutes(routeData) {
        const updatedRouteData = { ...currentRoute.route, ...routeData }
        const updatedRoutes = [...routes];
        updatedRoutes[currentRoute.index] = updatedRouteData
        setRoutes(updatedRoutes)
        selectRoute(currentRoute.index, updatedRouteData) // Update Current Route whenever, routes list changes
        setRouteAdded(false)
    }

    const [currentRoute, setCurrentRoute] = useState({index: routes.length - 1, route: routes[routes.length - 1]})

    const selectRoute = useCallback((routeIndex, routeData = null) => {
        setCurrentRoute({index: routeIndex, route: routeData ? routeData : routes[routeIndex]})
    }, [setCurrentRoute, routes])

    function updateConfigurationData(configData) {
        const updatedConfigData = {...configurationData, ...configData};
        updateRoutes({data: updatedConfigData});
        setConfigurationData(updatedConfigData);
    }

    const configurationValue = {
        configurationData,
        updateConfigurationData,
        routes, currentRoute, createNewRoute,
        selectRoute, updateRoutes
    };

    /*
        *   For Testing Configuration Data 
        *   Can be used in future for persistence Data
    */
    // React.useEffect(() => {
    //     localStorage.setItem('FARMSTACK_configurationData', JSON.stringify(configurationData));
    // }, [configurationData])
    React.useEffect(() => {
        if (routeAdded) {
            selectRoute(routes.length - 1)
        }
    }, [routes, routeAdded, selectRoute])

    return (
        <ConfigurationContext.Provider value={configurationValue}>
            {children}
        </ConfigurationContext.Provider>
    )
}