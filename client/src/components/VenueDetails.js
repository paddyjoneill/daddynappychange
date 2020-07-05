import React, { useState, useEffect } from 'react';

import NavBar from './NavBar';
import ReviewsList from './ReviewsList';
import ReviewService from '../services/ReviewService';



const VenueDetails = ({ history, lastSelectedPlace }) => {

    const [ reviews, setReviews ] = useState(null)
    // const [selectedReview, setSelectedReview] = useState(null)

    useEffect(() => {
        ReviewService.getReviewsByVenue(lastSelectedPlace.placeId)
        .then( res => {
            setReviews(res)
            console.log(res)
        } )

    }, [lastSelectedPlace])

    const Details = () => {
        if (lastSelectedPlace !== null) {
            return(
                <div className="venue-details-content">
                    <p>{lastSelectedPlace.name}</p>
                    <p>Latitude: {lastSelectedPlace.lat}</p>
                    <p>Longitude: {lastSelectedPlace.lng}</p>
                    {/* <p>google place id: {lastSelectedPlace.placeId}</p> */}
                </div>
            )
        } else {
            return null
        }
    }

    const Photo = () => {
        if(lastSelectedPlace !== null){
            const baseURL = 'https://daddynappychange.herokuapp.com/api/photo/'
            const url = baseURL + lastSelectedPlace.placeId
            return <img className="venue-photo" src={url} alt="" />
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
