import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

import * as reviewActions from "../../store/reviews";
import './ReviewTile.css';

function ReviewTile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentSpot = useSelector((state) => state.places.spot);
    const sessionUser = useSelector((state) => state.session.user);
    const allReviews = useSelector((state) => state.reviews.allReviews);
    const [reviewBody, setReviewBody] = useState("");
    const [edit, setEdit] = useState(false);
    const [target, setTarget] = useState(null);
    const [errors, setErrors] = useState([]);

    
    useEffect(() => {
        dispatch(reviewActions.getReviews(currentSpot.id))
    }, [currentSpot.id, dispatch, edit]);
    
    
    const handleClick = review => (e) => {
        e.preventDefault();
        setTarget(review.id)
        setEdit(true)
        setReviewBody(review.body)
    }

    const handleSubmit = (e) => {
            e.preventDefault();
            if (sessionUser) {
            setErrors([]);
            return dispatch(reviewActions.updateReview({ reviewBody, sessionUser, currentSpot, target }))
                .then(() => setEdit(false))
                .catch(async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    });
            }
            return setErrors(['Errors in editing the specified review for the current Vacation Spot']);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        if (sessionUser) {
            setErrors([]);
            return dispatch(reviewActions.deleteReview({ currentSpot, sessionUser, target }))
                .then(() => setEdit(false))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Errors in deleting the current Vacation Spot']);
    };

        
        
        
        if (currentSpot) {
            
        return (
            <>
                <h4>Review of {currentSpot.spotName}</h4>
                {allReviews?.map((review, idx) => {
                    if (!edit) {
                        return (
                            <div key={review.id} className='review-box'>
                                <h3>{review.User.username}</h3>
                                <h5>{review.body}</h5>
                                {sessionUser?.id === review.userId ? <button type='submit' onClick={handleClick(review)}>Edit</button> : null}
                            </div>
                        )

                    } else {
                        if (sessionUser?.id === review.userId && target === review.id) {
                            return (
                                <div key={idx} className='review-box'>
                                    <form onSubmit={handleSubmit}>
                                        <ul>
                                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                                        </ul>
                                        <label>
                                            Review:
                                    <textarea
                                                value={reviewBody || ""}
                                                onChange={(e) => setReviewBody(e.target.value)}
                                            />
                                        </label>
                                        <button type="submit">Edit Review</button>
                                    </form>
                                    <button type="submit" onClick={handleDelete}>Delete</button>
                                </div>
                            )

                        }
                        return (<></>)
                    }
                })}
            </>
        )

    }

    return (<h1>Comments</h1>);
}



export default ReviewTile;