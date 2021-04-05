import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

import * as reviewActions from "../../store/reviews";
import './ReviewForm.css';

function ReviewForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentSpot = useSelector((state) => state.places.spot);
    const sessionUser = useSelector((state) => state.session.user);
    const [reviewBody, setReviewBody] = useState("");
    const [errors, setErrors] = useState([]);

    console.log('Review', currentSpot)
    console.log('User', sessionUser)

    // useEffect(() => {
    //     localStorage.setItem('currentSpot', JSON.stringify(currentSpot))
    // });

    // useEffect(() => {
    //     const data = localStorage.getItem('currentSpot');

    //     if (data) {
    //         setSpotName(currentSpot?.spotName)
    //         setActivities(currentSpot?.activities);
    //         setLocation(currentSpot?.location);
    //         setPictureURL(currentSpot?.pictureURL);
    //     }
    // }, [currentSpot])


    if (currentSpot) {
        if (!sessionUser) {
            return (<h1>Please Login to Comment.</h1>)
        } else {

            const handleSubmit = (e) => {
                e.preventDefault();
                if (sessionUser) {
                    setErrors([]);
                    console.log('handleSubmit value', reviewBody)
                    return dispatch(reviewActions.createReview({ reviewBody, sessionUser, currentSpot }))
                        .then(() => setReviewBody(''))
                        .catch(async (res) => {
                            const data = await res.json();
                            if (data && data.errors) setErrors(data.errors);
                        });
                }
                return setErrors(['Errors in creating a review for the current Vacation Spot']);
            };

            // const handleDelete = (e) => {
            //     e.preventDefault();
            //     if (sessionUser) {
            //         setErrors([]);
            //         return dispatch(reviewActions.deleteSpot({ spotId, sessionUser }))
            //             .then(() => history.push('/'))
            //             .catch(async (res) => {
            //                 const data = await res.json();
            //                 if (data && data.errors) setErrors(data.errors);
            //             });
            //     }
            //     return setErrors(['Errors in deleting the current Vacation Spot']);
            // };


            return (
                <>
                    <h1>Review {currentSpot.spotName}:</h1>
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <label>
                            Review:
                                <textarea
                                value={reviewBody || ''}
                                onChange={(e) => setReviewBody(e.target.value)}
                            />
                        </label>
                        <button type="submit">Post a Review</button>
                    </form>
                    {/* <button type="submit" onClick={handleDelete}>Delete</button> */}
                </>
            );
        }

    }

    return (<h1>Comments</h1>);
}



export default ReviewForm;