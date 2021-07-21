import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import * as spotActions from "../../store/vacation-spots";
import './SpotTile.css';

function SpotTile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allSpots = useSelector((state) => state.places.allSpots);


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



    return (<></>);
}



export default SpotTile;