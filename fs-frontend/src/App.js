import React from 'react';
import 'rodal/lib/rodal.css';
import './App.css';

import Flow from './components/flow/Flow';
import Header from './components/header/Header';

function App() {
  return (
        <div className="fs-main-container">
            <Header />
            <Flow />
        </div>
  );
}

export default App;
