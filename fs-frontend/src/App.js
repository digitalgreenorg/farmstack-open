import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Flow from './components/flow/Flow';
import Configuration from './components/configuration/Configuration';

/**
 * TODO: Sidebar
*/
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" component={Flow} exact />
          <Route path="/configure" component={Configuration} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
