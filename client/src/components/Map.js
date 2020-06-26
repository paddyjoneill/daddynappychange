import React, {useState, useCallback, useRef} from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api';

import NavBar from './NavBar';
import LocateButton from './LocateButton';
import mapStyles from '../services/MapStyles';

const libraries = ['places'];
const mapContainerStyle = {
    width: '100vw',
    height: '85vh'
}
const center = {
    lat:55.9469809, 
    lng:-3.1905524
}
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

const Map = ({places, setLastSelectedPlace, history}) => {

    const [selectedPlace, setSelectedPlace] = useState(null);
    const{ isLoaded, loadError} = useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries })
    

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])
    const panTo = useCallback(({lat, lng}) => {
        mapRef.current.panTo({ lat, lng})
        mapRef.current.setZoom(15)
    }, []);

    if (loadError) return "Error loading maps"
    if (!isLoaded ) return "Loading Maps"

    


    return (
        <div>
            <NavBar history={history}></NavBar>
            <LocateButton panTo={panTo}></LocateButton>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >
                {places.map( place => <Marker 
                key={place.placeId} 
                position={{lat:place.lat, lng:place.lng}}
                onClick={() => {
                    setSelectedPlace(place)
                    setLastSelectedPlace(place)
                }}
                />)}
                {selectedPlace ? (
                <InfoWindow 
                position={{lat:selectedPlace.lat, lng:selectedPlace.lng}}
                onCloseClick={() => setSelectedPlace(null)}
                >
                    <div>
                        <h3>{selectedPlace.name}</h3>
                        {/* <p>{selectedPlace.placeId}</p> */}
                        <p onClick={() => history.push("/venue")}>Click for more info!</p>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>
        </div>
    )


}

export default Map