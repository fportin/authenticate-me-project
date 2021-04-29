import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

import * as spotActions from "../../store/vacation-spots";
import './SpotTile.css';

function SpotTile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allSpots = useSelector((state) => state.places.allSpots);
    const sessionUser = useSelector((state) => state.session.user);
    const allReviews = useSelector((state) => state.reviews.allReviews);
    // const [errors, setErrors] = useState([]);


    useEffect(() => {
        dispatch(spotActions.getSpots())
    }, [dispatch]);

    const handleClick = spotId => (e) => {
        e.preventDefault();
        history.push(`/spots/${spotId}`)
    }

    if (allSpots) {

        return (
            <>
                {allSpots?.map(spot => {
                    return (
                        <div key={spot.id} className='spot-tile__container' style={{ backgroundImage: `url(${spot.pictureURL})` }} onClick={handleClick(spot.id)}>
                            {spot.spotName}
                        </div>
                    )
                })}
            
            </>

        )

    }



    return (<h1>Spot</h1>);
}



export default SpotTile;