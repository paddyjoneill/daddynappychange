import React, { useState } from "react";

import NavBar from './NavBar'

import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";

export default function AddLocation({setPlaces, places, history}) {
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
    const name = results[0].name
    console.log(results);
    
    setAddress(value);
    setCoordinates(latLng);
    setPlaceId(place);
    setPlaceName(name);
    console.log(name)
  };

  const handleSubmit = () => {
    let newPlace = {
        name: placeName,
        lat: coordinates.lat,
        lng: coordinates.lng,
        placeId: placeId
    }
    setPlaces([...places, newPlace])
    console.log("places", places)
    
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