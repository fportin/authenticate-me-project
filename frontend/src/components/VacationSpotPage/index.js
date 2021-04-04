import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";

import * as spotActions from "../../store/vacation-spots";
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
        console.log('CurrSpot', currentSpot.id)
        console.log('SPOTID', spotId)
        if (currentSpot.id !== parseInt(spotId, 10)) {
            console.log('I fired 2')
            return (<Redirect to='/' />)
        } else {
            console.log('I fired 3')
            return (
                <>
                    <h1>{currentSpot.spotName}</h1>
                    <img src={currentSpot.pictureURL} alt='place'/>
                    <h4>Location: {currentSpot.location}</h4>
                    <p>Activities: {currentSpot.activities}</p>
                    {sessionUser?.id === currentSpot.userId ? <button onClick={editOnClick}>Edit</button> : <h2>different user so No</h2>}
                </>
                
            );
        }
    }
    console.log('I fired 4')
    return (<></>);

}

export default VacationSpotPage;