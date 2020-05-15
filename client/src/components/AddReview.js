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
    }

return(
    <div>
        <NavBar history={history} />
        <div>
            <h2>Submit Review Form here</h2>
            <br></br>
            <p>Title:</p>
            <input type="text" onChange={(event) => setTitle(event.target.value)}></input>
            <br></br>
            <br></br>
            <p>Enter Review Below:</p>
            <textarea onChange={(event) => setText(event.target.value)}></textarea>
            <br></br>
            <br></br>
            <button onClick={handleSubmit}>Submit Review</button>
        </div>
    </div>
)

}

export default AddReview;