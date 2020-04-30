import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";

export default function AddLocation() {
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });
  const [placeId, setPlaceId] = useState("");

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    const place = results[0].place_id
    console.log(results);
    
    setAddress(value);
    setCoordinates(latLng);
    setPlaceId(place);
  };

  return (
    <div>
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