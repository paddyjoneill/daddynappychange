import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Map from './components/Map';
import Login from './components/Login';
import Signup from './components/Signup';
import AddLocation from './components/AddLocation';
import VenueDetails from './components/VenueDetails';
import AddReview from './components/AddReview';

import TestLogin from './components/TestLogin';


import VenueService from './services/VenueService'

import './App.css';

function App() {

  const [ places, setPlaces ] = useState([]);
  const [ lastSelectedPlace, setLastSelectedPlace] = useState(null);
  const [ jwt, setJwt ] = useState("");


  useEffect(() => {
    VenueService.getVenues()
    .then( data => setPlaces(data))
  }, [] )
  


  return (
    <div className="App">
      
      <Router>
        <Switch>
          
          <Route 
            exact path="/" 
            render={(props) => <Map {...props}
            places={places} 
            setLastSelectedPlace={setLastSelectedPlace}
            lastSelectedPlace={lastSelectedPlace}
            />}
          />
          
          <Route exact path="/login"
            render={(props) => <Login {...props}
            setJwt={setJwt}
            />}
          />

          <Route exact path="/signup"
            render={(props) => <Signup {...props}
            />}
          />
            
          <Route exact path="/addlocation"
            render={(props) => <AddLocation {...props}
            setPlaces={setPlaces}
            places={places}
            />}
          />

          <Route exact path="/venue"
            render={(props) => <VenueDetails {...props} 
            lastSelectedPlace={lastSelectedPlace}
            />}
          />

          <Route exact path="/addreview"
            render={(props) => <AddReview {...props} 
            lastSelectedPlace={lastSelectedPlace}
            />}
          />  

          <Route exact path="/testlogin" 
            render={(props) => <TestLogin {...props}
            jwt={jwt}
            />}
          />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
