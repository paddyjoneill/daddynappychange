import React, { useState } from 'react';
import NavBar from './NavBar';

import ReviewService from '../services/ReviewService';

const AddReview = ({history, lastSelectedPlace}) => {

    const [ title, setTitle ] = useState('');
    const [ text, setText ] = useState('');

    const handleSubmit = () => {
        let reviewObject = {
            title: title,
            text: text,
            placeId: lastSelectedPlace.placeId
        }
        ReviewService.addReview(reviewObject)
        .then( res => history.push('/venue'))
    }

return(
    <div>
        <NavBar history={history} />
        <div className="add-review-background">
            <br></br>
        <div className="add-review-form">
            <h2>Submit Review</h2>
            <input type="text" 
            onChange={(event) => setTitle(event.target.value)}
            className="form-input"
            placeholder="Review Title"
            ></input>
            <br></br>
            <textarea 
            onChange={(event) => setText(event.target.value)}
            placeholder="Enter Review Details"
            className="form-input"
            ></textarea>
            <br></br>
            <button 
            onClick={handleSubmit}
            className="submit-review-button"
            >Submit Review</button>
        </div>
        </div>
    </div>
)

}

export default AddReview;