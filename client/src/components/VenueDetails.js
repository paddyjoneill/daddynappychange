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

    // const Reviews = () => {
    //     if (reviews !== null){
    //         return reviews.map((review, index) => {
    //             return <div><h3>{review.title}</h3><p>{review.text}</p></div>
    //         })
    //     } else {
    //         return null
    //     }
    // } 
    


return(
    <div>
        <NavBar history={history} />
        <div>
            <h2>Venue Details</h2>
            <Details></Details>
            <br></br><br></br>
        </div>
        <ReviewsList reviews={reviews} history={history} />
    </div>
)

}

export default VenueDetails;
