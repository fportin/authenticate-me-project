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

    document.body.classList.add('body-spot-page');
    
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

        const handleCancel = (e) => {
            e.preventDefault()
            history.push(`/`)
        }

        const handleClear = (e) => {
            e.preventDefault()
            setSpotName("")
            setActivities("")
            setLocation("")
            setPictureURL("")
        }
    
        return (
            <div className='spot-page-form__container'>
                <div className='edit-spot-title'>Post a Vacation Spot
                    <ul className='edit-spot-form-errors'>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>
                <form className='spot-page__form' onSubmit={handleSubmit}>
                    <label className='edit-spot-form-label'>
                        Name:
                        <input
                            type="text"
                            value={spotName}
                            onChange={(e) => setSpotName(e.target.value)}
                            placeholder="The Name of the Place."
                            className='create-spot-form-box'
                            required
                        />
                    </label>
                    <label className='edit-spot-form-label'>
                        Activities:
                        <textarea
                            value={activities}
                            onChange={(e) => setActivities(e.target.value)}
                            placeholder="Things you could do at this location."
                            className='create-spot-form-box activities'
                            />
                    </label>
                    <label className='edit-spot-form-label'>
                        Location:
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Address/Town/City/State/Country"
                            className='create-spot-form-box'
                            required
                            />
                    </label>
                    <label className='edit-spot-form-label'>
                        Picture URL:
                        <input
                            type="url"
                            value={pictureURL}
                            onChange={(e) => setPictureURL(e.target.value)}
                            placeholder="URL of the place's image. (Use a 4K image for best results)"
                            className='create-spot-form-box'
                        />
                    </label>
                    <div className='edit-spot-form-btn__container'>
                        <button className='edit-spot-form-btn' type="submit">Submit</button>
                        <button className='edit-spot-form-btn' type="reset" onClick={handleCancel}>Cancel</button>
                        <button className='edit-spot-form-btn' type="button" onClick={handleClear}>Clear</button>
                    </div>
                </form>
            </div>
        );
    } else {
        return <Redirect to="/login" />;
    }
}

export default VacationSpotFormPage;