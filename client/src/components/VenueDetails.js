import React, { useState } from 'react';

import NavBar from './NavBar';

const VenueDetails = ({ history, lastSelectedPlace }) => {

    const [ venueDetails, setVenueDetails] = useState(null)

    const Details = () => {
        if (lastSelectedPlace !== null) {
            return(
                <div>
                    <p>{lastSelectedPlace.name}</p>
                    <p>lat: {lastSelectedPlace.lat}</p>
                    <p>long: {lastSelectedPlace.lng}</p>
                    <p>google place id: {lastSelectedPlace.placeId}</p>
                </div>
            )
        } else {
            return null
        }
    }


return(
    <div>
        <NavBar history={history} />
        <div>
            <h2>Venue Details</h2>
            <Details></Details>
        </div>
    </div>
)

}

export default VenueDetails;
