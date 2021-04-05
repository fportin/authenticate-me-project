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
    const [errors, setErrors] = useState([]);

    console.log('Review', allReviews)
    console.log('User', sessionUser)

    useEffect(() => {
        dispatch(reviewActions.getReviews(currentSpot.id))
    }, [currentSpot.id, dispatch]);

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

        return (
            <>
                <h4>Review of {currentSpot.spotName}</h4>
                {allReviews?.map(review => {
                    return (
                        <div>
                            <h3>{review.User.username}</h3>
                            <h5>{review.body}</h5>
                            {sessionUser?.id === review.userId ? <button>Edit</button> : null}
                        </div>
                    )
                })}
            </>
        )

    }

    return (<h1>Comments</h1>);
}



export default ReviewTile;