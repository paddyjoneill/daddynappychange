import React, { useState } from "react";

import NavBar from './NavBar'

import VenueService from '../services/VenueService'

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export default function AddLocation({setPlaces, setLastSelectedPlace, places, history}) {
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });
  const [placeId, setPlaceId] = useState("");
  const [placeName, setPlaceName] = useState("");
  

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    const place = results[0].place_id
    
    setAddress(value);
    setCoordinates(latLng);
    setPlaceId(place);
    setPlaceName(value.split(',')[0]);
    
  };

  const handleSubmit = () => {
    let newPlace = {
        name: placeName,
        lat: coordinates.lat,
        lng: coordinates.lng,
        placeId: placeId
    }
    setPlaces([...places, newPlace])
    VenueService.postVenue(newPlace)
    .then( res => {
      setLastSelectedPlace(newPlace);
      history.push("/venue")
    } )
    
  }

  return (
    <div>
        <NavBar history={history}></NavBar>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p>
            <p>Place Id: {placeId}</p>

            <input {...getInputProps({ placeholder: "Type address" })} />

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>

            <button onClick={handleSubmit} >Submit</button>

          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}


// import React, {useState} from 'react';
// import PlacesAutocomplete, { geocodeByAddress,
//     geocodeByPlaceId,
//     getLatLng} from 'react-places-autocomplete';

// const AddLocation = () => {

//     const [address, setAddress] = useState("");

//     const handleSelect = async (value) => {}



// return(
//     <div>
//         <PlacesAutocomplete 
//         value={address} 
//         onChange={setAddress} 
//         onSelect={handleSelect} >
//             {(getInputProps, suggestions, getSuggestionItemProps, loading) => {
//                 return(
//                 <div>
//                     <input {...getInputProps({placeholder: "Type Address"})} />
//                 </div>
                
                
                
                
//                 )}}
//         </PlacesAutocomplete>
//     </div>
// )

// }

// export default AddLocation