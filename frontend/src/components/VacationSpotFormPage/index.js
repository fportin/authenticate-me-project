import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import * as spotActions from "../../store/vacation-spots";
import * as spotLocationActions from "../../store/spot-location";
import './VacationSpotForm.css';

function VacationSpotFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
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
                    .then((res) => {
                        const { id, location } = res
                        dispatch(spotLocationActions.createSpotLocation({ id, location }))
                    })
                    .then(() => history.push(`/`))
                    .catch(async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    });
            }
            return setErrors(['Errors in creating a new Vacation Spot']);
        };
    
        return (
            <div className='spot-page-form__container'>

                <form className='spot-page__form' onSubmit={handleSubmit}>
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
                    />
                </label>
                <button type="submit">Post a Vacation Spot</button>
            </form>
        </div>
        );
    } else {
        return <Redirect to="/login" />;
    }
}

export default VacationSpotFormPage;