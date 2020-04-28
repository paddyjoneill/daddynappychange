import React from 'react';

import {GoogleMap, withScriptjs, withGoogleMap} from 'react-google-maps';

const Map = () => {

const MapObject = () => {
    return(
        <GoogleMap 
        defaultZoom={15} 
        defaultCenter={{lat:55.953251, lng:-3.188267}}
        />
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