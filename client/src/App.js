import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavBar from './components/NavBar';
import Map from './components/Map';
import Login from './components/Login';
import AddLocation from './components/AddLocation';

import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Router>
        <Switch>
          
          <Route exact path="/">
            <Map></Map>
          </Route>
          
          <Route exact path="/login">
            <Login></Login>
          </Route>
          
          <Route exact path="/addlocation">
            <AddLocation></AddLocation>
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
