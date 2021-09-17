import React from 'react';
import './assets/css/App.css';
import "bootstrap/dist/css/bootstrap.css";

import Dashboard from './components/Dashboard'
import NewCar from './components/NewCar';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
        <Router>
          <Switch>
            <Route path="/dashboard" exact render = { props => (<Dashboard {...props} />)}></Route>
            <Route path="/nuevo-carro" exact render = { props => (<NewCar {...props} />)}></Route>
          </Switch>
        </Router>
    </React.Fragment>
  );
}

export default App;
