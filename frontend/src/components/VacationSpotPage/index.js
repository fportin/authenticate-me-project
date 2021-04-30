import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";

import * as spotActions from "../../store/vacation-spots";
import ReviewForm from "../ReviewForm";
import ReviewTile from "../ReviewTile";
import SpotMap from '../SpotMap'
import './VacationSpotPage.css';

function VacationSpotPage() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const currentSpot = useSelector((state) => state.places.spot);
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();
    
    const editOnClick = () => {
        history.push(`/spots/${spotId}/edit`)
    }

    useEffect(() => {
        dispatch(spotActions.getSpot(spotId))
    }, [spotId, dispatch]);
    
   
    if (currentSpot) {
        
        return (
            <div className='spot-page'>
                <div className='spot-page__container'>
                    <img src={currentSpot.pictureURL} alt='place' className='spot-picture'/>
                    <h1 className='spot-name'>{currentSpot.spotName}</h1>
                    <h4>Location: {currentSpot.location}</h4>
                    <SpotMap />
                    <p>Activities: {currentSpot.activities}</p>
                    {sessionUser?.id === currentSpot.userId ? <button onClick={editOnClick}>Edit</button> : null}
                    <ReviewTile />
                </div>
            </div>
        );
    }
    return (<></>);

}

export default VacationSpotPage;