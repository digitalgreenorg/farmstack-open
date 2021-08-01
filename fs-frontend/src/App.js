import React from 'react';
import './App.css';
import { ConfigurationsProvider } from './contexts/ConfigurationsProvider';
import Flow from './components/flow/Flow';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';

function App() {

  return (
    <div className="FS__mainContainer">
      <ConfigurationsProvider>
        <Header />
        <div className="FS__contentWrapper">
            <div className="FS__sidebar"><Sidebar /></div>
            <div className="FS__mainContent">
                <Flow />
                {/* <ConnectorMap /> */}
            </div>
        </div>
      </ConfigurationsProvider>
    </div>  
  );
}

export default App;
