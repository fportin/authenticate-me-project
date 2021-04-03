import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";

import * as spotActions from "../../store/vacation-spots";

function VacationSpotEdit() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const currentSpot = useSelector((state) => state.places.spot);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(spotActions.getSpot(spotId))
    }, [spotId, dispatch]);


    if (currentSpot) {
        if (!sessionUser || sessionUser.id !== currentSpot.userId) {
            return ( <Redirect to='/' /> )
        } else {
            return (
                <>
                    <h1>Edit Page {currentSpot.id}</h1>
                </>
            );
        }
    }

    return (<></>);

}

export default VacationSpotEdit;