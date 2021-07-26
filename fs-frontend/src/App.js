import React from 'react';
import './App.css';

import Flow from './components/flow/Flow';
import Header from './components/header/Header';
import { ConfigurationsProvider } from './contexts/ConfigurationsProvider';

function App() {
  return (
        <div className="fs-main-container">
            <Header />
            <ConfigurationsProvider>
              <Flow />
            </ConfigurationsProvider>
        </div>
  );
}

export default App;
