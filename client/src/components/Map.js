import React, { useState } from 'react';

import NavBar from './NavBar'

import * as PlacesData from '../services/places.json'

import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';

const Map = ({ places, setPlaces, history }) => {

    const [selectedPlace, setSelectedPlace] = useState(null);

const MapObject = () => {

    console.log(places)
    
    return(
        <GoogleMap 
        defaultZoom={15} 
        defaultCenter={{lat:55.9469809, lng:-3.1905524}}
        >

        { places.map( place => (
            <Marker
            key={place.placeId}
            position={{
              lat: place.lat,
              lng: place.lng
            }}
            onClick={() => {
              setSelectedPlace(place);
            }}

        
          />
        
        ))}

        
              {selectedPlace && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPlace(null);
          }}
          position={{
            lat: selectedPlace.lat,
            lng: selectedPlace.lng
          }}
        >
          <div>
            <h2>{selectedPlace.name}</h2>
            <p>{selectedPlace.placeId}</p>
          </div>
        </InfoWindow>
      )}
        
        </GoogleMap>

    )
}

const WrappedMap = withScriptjs(withGoogleMap(MapObject))

return (
    <div>
        <NavBar history={history}></NavBar>
    
    <div style={{width: '100vw', height: '100vh'}}>
        <WrappedMap 
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}/>
    </div>
    </div>
)


}

export default Map