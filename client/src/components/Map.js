import React, {useState} from 'react';

import NavBar from './NavBar'


import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';

const Map = ({ places, lastSelectedPlace, setLastSelectedPlace, history }) => {

    const [selectedPlace, setSelectedPlace] = useState(null);

const MapObject = () => {
    
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
              setLastSelectedPlace(place)
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
            <p onClick={() => history.push("/venue")}>Click for more info!</p>
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
    
    <div style={{width: '100vw', height: '85vh'}}>
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