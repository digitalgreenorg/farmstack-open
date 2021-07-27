import React from 'react';
import './App.css';
import ConnectorMap from './components/connector-map/ConnectorMap';

import Flow from './components/flow/Flow';
import Header from './components/header/Header';
import { ConfigurationsProvider } from './contexts/ConfigurationsProvider';

function App() {
  return (
        <div className="fs-main-container">
            <Header />
            <ConfigurationsProvider>
              {/* <Flow /> */}
              <ConnectorMap />
            </ConfigurationsProvider>
        </div>
  );
}

export default App;
