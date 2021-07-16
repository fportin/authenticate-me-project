import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

import * as reviewActions from "../../store/reviews";
import ReviewForm from '../ReviewForm'
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

    const handleCancel = (e) => {
        e.preventDefault();
        setEdit(false);
        setErrors([])
    }
    
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
    
    let errorBox;
    if (errors.length !== 0) {
        errorBox = (
            <ul className='edit-review-form-errors'>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
        )
    }
    
    
    
    if (currentSpot && allReviews) {
        console.log('reviews length', allReviews.length)
        
        return (
            <div className='review-tile__container'>
                <div className='review-title'>User Reviews</div>
                { edit ? null : <ReviewForm /> }
                {allReviews.map((review, idx) => {
                    if (!edit) {
                        return (
                            <div key={review.id} className='review-box'>
                                <div className='review-box-top'>
                                    <div class='review-box-user'>{review.User.username}</div>
                                    {sessionUser?.id === review.userId ? <button type='submit' onClick={handleClick(review)} className='edit-review-btn'>Edit</button> : null}
                                </div>
                                <div className='review-box-body'>{review.body}</div>
                                <div className='review-box-date'>{review.createdAt.toString().slice(0, 10)}</div>
                            </div>
                        )

                    } else {
                        //EDIT FORM
                        if (sessionUser?.id === review.userId && target === review.id) {
                            return (
                                <div key={idx} className='edit-review-form__container'>
                                    <form onSubmit={handleSubmit} className='edit-review-form'>
                                        <label className='edit-review-form-label'>
                                            Edit Review:
                                        <textarea
                                            value={reviewBody || ""}
                                            onChange={(e) => setReviewBody(e.target.value)}
                                            className='edit-review-form-box'
                                        />
                                        </label>
                                        <div className='edit-review-form-btn__container'>
                                            <button className='review-form-btn' type="submit">Submit</button>
                                            <button className='review-form-btn' type="reset" onClick={handleCancel}>Cancel</button>
                                            <button className='review-form-btn' type="button" onClick={handleDelete}>Delete</button>
                                            {errorBox}
                                        </div>
                                    </form>
                                </div>
                            )

                        }
                        return (<></>)
                    }
                })}
            </div>
        )

    }

    return (<h1>Reviews</h1>);
}



export default ReviewTile;