import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as reviewActions from "../../store/reviews";
import './ReviewForm.css';

function ReviewForm() {
    const dispatch = useDispatch();
    const currentSpot = useSelector((state) => state.places.spot);
    const sessionUser = useSelector((state) => state.session.user);
    const [reviewBody, setReviewBody] = useState("");
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [errors, setErrors] = useState([]);
  
    useEffect(() => {
        dispatch(reviewActions.getReviews(currentSpot.id))
        setReviewSubmitted(false)
    }, [currentSpot.id, dispatch, reviewSubmitted]);


    if (currentSpot) {
        if (!sessionUser) {
            return (<div className='review-form-message'>Please Login to Review.</div>)
        } else {

            const handleSubmit = (e) => {
                e.preventDefault();
                if (sessionUser) {
                    setErrors([]);
                    return dispatch(reviewActions.createReview({ reviewBody, sessionUser, currentSpot }))
                        .then(() => { 
                            setReviewBody('')
                            setReviewSubmitted(true)
                        })
                        .catch(async (res) => {
                            const data = await res.json();
                            if (data && data.errors) setErrors(data.errors);
                        });
                }
                return setErrors(['Errors in creating a review for the current Vacation Spot']);
            };

            const handleCancel = (e) => {
                e.preventDefault();
                setReviewBody('');
                setErrors([])
            }

            let errorBox;
            if (errors.length !== 0) {
                errorBox = (
                    <ul className='review-form-errors'>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                )
            }

            
            return (
                <>
                    <form className='review-form' onSubmit={handleSubmit}>
                        <label className='review-form-label'>
                            Post a Review:
                                <textarea
                                value={reviewBody || ''}
                                onChange={(e) => setReviewBody(e.target.value)}
                                className='review-form-box'
                                placeholder={`Tell us about your ${currentSpot.spotName} experience.`}
                            />
                        </label>
                        <div className='review-form-btn__container'>
                            <button className='review-form-btn' type="submit">Submit</button>
                            <button className='cancel-form-btn' type="reset" onClick={handleCancel}>Cancel</button> 
                            {errorBox}
                        </div>
                    </form>
                </>
            );
        }

    }

    return (<h1>Comments</h1>);
}



export default ReviewForm;