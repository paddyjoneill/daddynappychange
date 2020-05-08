import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// import NavBar from './components/NavBar';
import Map from './components/Map';
import Login from './components/Login';
import Signup from './components/Signup';
import AddLocation from './components/AddLocation';


import VenueService from './services/VenueService'

// import * as PlacesData from './services/places.json'
import './App.css';

function App() {

  const [places, setPlaces] = useState([])

  

  useEffect(() => {
    VenueService.getVenues()
    .then( data => setPlaces(data))
  }, [])
  


  return (
    <div className="App">
      
      <Router>
        <Switch>
          
        <Route 
          exact path="/" 
          render={(props) => <Map {...props}
          setPlaces={setPlaces}
          places={places} 
          />}
        />
          
          <Route exact path="/login"
          render={(props) => <Login {...props}
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

        </Switch>
      </Router>
    </div>
  );
}

export default App;
