import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import NavBar from './NavBar';
import ReviewsList from './ReviewsList';
import ReviewService from '../services/ReviewService';
import VenueService from '../services/VenueService';



const VenueDetails = ({ history, lastSelectedPlace }) => {

    const [ reviews, setReviews ] = useState(null)
    const [ venue, setVenue ] = useState(null)
    const searchString = useLocation()['search'].toString();
    let venueId = new URLSearchParams(searchString).get('venue_id');


    useEffect(() => {
        VenueService.getVenue(venueId)
        .then( res => {
            setVenue(res);
            ReviewService.getReviewsByVenue(res.placeId)
            .then( res => setReviews(res) )  
        })
    }, [venueId])

    const Details = () => {
        if (venue !== null) {
            return(
                <div className="venue-details-content">
                    <p>{venue.name}</p>
                    <p>Latitude: {venue.lat}</p>
                    <p>Longitude: {venue.lng}</p>
                    {/* <p>google place id: {lastSelectedPlace.placeId}</p> */}
                    <GoogleMapsLink></GoogleMapsLink>
                </div>
            )
        } else {
            return null
        }
    }

    const GoogleMapsLink = () => {
        if(venue !== null){
            let googleMapUrl = "https://www.google.com/maps/search/?api=1&query=address&query_place_id=" + venue.placeId
            return <h3><a className="google-map-link" href={googleMapUrl}>Open in Google Maps</a></h3>
        } else {
            return null
        }
    }

    const Photo = () => {
        if(venue !== null){
            const baseURL = 'https://daddynappychange.co.uk/api/photo/'
            const url = baseURL + venue.placeId
            return <img className="venue-photo" src={url} alt="" />
        } else {
            return null
        }
    }
    
return(
    <div>
        <NavBar history={history} />
        <div className="venue-details-background">
            <br></br>
        <div className="venue-details">
            <h2>Venue Details</h2>
            <Details></Details>
            
        </div>
        <div className="venue-details-photo">
            {/* <img className="venue-photo" src="/edinburgh-castle.jpg" alt="castle"/> */}
            <Photo></Photo>
        </div>
        <div className="reviews-section">
            <ReviewsList reviews={reviews} history={history} />
        </div>
        </div>
    </div>
)

}

export default VenueDetails;
