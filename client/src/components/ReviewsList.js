import React from 'react';

const ReviewsList = ({reviews, history}) => {

    const Reviews = () => {
        if (reviews !== null){
            return reviews.map((review, index) => {
                return <div className="review-div"><h3 className="review-title">{review.title}</h3><p className="review-content">{review.text}</p></div>
            })
        } else {
            return null
        }
    } 

    return(
        <div>
            <h2 className="reviews-section-title">Reviews</h2>
            <h2 className="add-review" onClick={() => history.push('/addreview')}>Add Review</h2>
            <Reviews />
        </div>
        
    )

}

export default ReviewsList