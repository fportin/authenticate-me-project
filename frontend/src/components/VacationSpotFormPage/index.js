import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import * as spotActions from "../../store/vacation-spots";
import './VacationSpotForm.css';

function VacationSpotFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [spotName, setSpotName] = useState("");
    const [activities, setActivities] = useState("");
    const [location, setLocation] = useState("");
    const [pictureURL, setPictureURL] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) {
        
        const handleSubmit = (e) => {
            e.preventDefault();
            if (sessionUser) {
                setErrors([]);
                return dispatch(spotActions.createSpot({ spotName, activities, location, pictureURL, sessionUser }))
                    .catch(async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    });
            }
            return setErrors(['Errors for Vacation Spot Form']);
        };
    
        return (
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Name:
            <input
                        type="text"
                        value={spotName}
                        onChange={(e) => setSpotName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Activities:
            <textarea
                        value={activities}
                        onChange={(e) => setActivities(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Location:
            <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Picture URL:
            <input
                        type="url"
                        value={pictureURL}
                        onChange={(e) => setPictureURL(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Post a Vacation Spot</button>
            </form>
        );
    } else {
        return <Redirect to="/login" />;
    }
}

export default VacationSpotFormPage;