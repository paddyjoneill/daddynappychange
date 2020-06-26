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
            <div className="reviews-header">
            <h2 className="reviews-section-title">Reviews</h2>
            <h3 className="add-review" onClick={() => history.push('/addreview')}>Add Review</h3>
            </div>
            <Reviews />
        </div>
        
    )

}

export default ReviewsList