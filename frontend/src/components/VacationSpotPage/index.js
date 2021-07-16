import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import * as spotActions from "../../store/vacation-spots";
import ReviewTile from "../ReviewTile";
import SpotMap from '../SpotMap'
import backArrow from "../../back-arrow.png"
import './VacationSpotPage.css';

function VacationSpotPage() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const currentSpot = useSelector((state) => state.places.spot);
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const [container2, setContainer2] = useState(false);

    document.body.classList.add('body-spot-page');

    const showContainer1 = (e) => {
        e.preventDefault()
        const secondContainer = document.querySelector('.spot-page__container2')
        if (secondContainer) {
            secondContainer.classList.add('close-container')
            setTimeout(() => {
                setContainer2(false)
            }, 400)
        }
    }

    const showContainer2 = (e) => {
        e.preventDefault()
        setContainer2(true)
    }
    
    const editOnClick = () => {
        history.push(`/spots/${spotId}/edit`)
    }

    useEffect(() => {
        dispatch(spotActions.getSpot(spotId))
    }, [spotId, dispatch]);
    
   
    if (currentSpot) {
        
        return (
            <div className='spot-page' style={{ backgroundImage: `url(${currentSpot.pictureURL})` }}>
                {!container2 ? 
                    <div className='spot-page__container1' >
                        <div className='spot-name'>{(currentSpot.spotName).toUpperCase()}</div>
                        <hr/>
                        <p className='spot-activities'>Activities: {currentSpot.activities}</p>
                        <div className='spot-page1-btn__container'>
                            <button type='button' className='show-container2-btn' onClick={showContainer2}>Map & Reviews</button>
                            {sessionUser?.id === currentSpot.userId ? <button onClick={editOnClick} className='edit-spot-btn'>Edit This Spot</button> : null}
                        </div>
                    </div> : 
                    <div className='spot-page__container2'>
                        <div className='spot-page__container2-a'>
                            <div className="back-arrow-icon" style={{ backgroundImage: `url(${backArrow})` }} onClick={showContainer1} />
                            <SpotMap />
                            <div className='spot-location'>Location: {currentSpot.location}</div>
                        </div>
                        <div className='spot-page__container2-b'>
                            <ReviewTile />
                        </div>
                    </div>
                }
            </div>
        );
    }
    return (<></>);

}

export default VacationSpotPage;