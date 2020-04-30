import React, { useState } from 'react';

import * as PlacesData from '../services/places.json'

import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';

const Map = () => {

    const [selectedPlace, setSelectedPlace] = useState(null);

const MapObject = () => {
    // console.log(PlacesData.name)
    // console.log(PlacesData.lat);
    // console.log(PlacesData.lng);
    // console.log(PlacesData.placeId)
    
    
    return(
        <GoogleMap 
        defaultZoom={15} 
        defaultCenter={{lat:55.9469809, lng:-3.1905524}}
        >
            <Marker
          key={PlacesData.placeId}
          position={{
            lat: PlacesData.lat,
            lng: PlacesData.lng
          }}
          onClick={() => {
            setSelectedPlace(PlacesData);
          }}
      
        >
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
        </Marker>
        </GoogleMap>

    )
}

const WrappedMap = withScriptjs(withGoogleMap(MapObject))

return (
    <div style={{width: '100vw', height: '100vh'}}>
        <WrappedMap 
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}/>
    </div>
)


}

export default Map