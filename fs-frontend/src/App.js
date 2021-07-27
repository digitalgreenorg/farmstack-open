import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import ConnectorMap from './components/connector-map/ConnectorMap';

import Flow from './components/flow/Flow';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import { ConfigurationsProvider } from './contexts/ConfigurationsProvider';

function App() {
  return (
        <BrowserRouter>
          <div className="fs-main-container">
              <Header />
              <ConfigurationsProvider>
                <div className="main__wrapper h_100_percent flex__container">
                  <div className="main__sidebar">
                    <Sidebar />
                  </div>
                  <div className="main__content__wrapper">
                    <Switch>
                      <Route path="/" component={Flow} exact />
                      <Route path="/connections" component={ConnectorMap} />
                    </Switch>
                  </div>
                </div>
              </ConfigurationsProvider>
          </div>
        </BrowserRouter>
  );
}

export default App;
