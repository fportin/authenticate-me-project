import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";

import * as spotActions from "../../store/vacation-spots";
import './VacationSpotEdit.css';

function VacationSpotEdit() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory();
    const currentSpot = useSelector((state) => state.places.spot);
    const sessionUser = useSelector((state) => state.session.user);
    const [spotName, setSpotName] = useState("");
    const [activities, setActivities] = useState("");
    const [location, setLocation] = useState("");
    const [pictureURL, setPictureURL] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(spotActions.getSpot(spotId))
    }, [spotId, dispatch]);
    
    useEffect(() => {
        localStorage.setItem('currentSpot', JSON.stringify(currentSpot))
    });

    useEffect(() => {
        const data = localStorage.getItem('currentSpot');

        if (data) {
            setSpotName(currentSpot?.spotName)
            setActivities(currentSpot?.activities);
            setLocation(currentSpot?.location);
            setPictureURL(currentSpot?.pictureURL);
        }
    }, [currentSpot])


    if (currentSpot) {
        if (!sessionUser) {
            return ( <Redirect to='/login' /> )
        } else {
            if (sessionUser.id !== currentSpot.userId) {
                return (<Redirect to='/' />)
            } else {

                const handleSubmit = (e) => {
                    e.preventDefault();
                    if (sessionUser) {
                        setErrors([]);
                        return dispatch(spotActions.updateSpot({ spotId, spotName, activities, location, pictureURL, sessionUser }))
                            .then(() => history.push(`/spots/${spotId}`))
                            .catch(async (res) => {
                                const data = await res.json();
                                if (data && data.errors) setErrors(data.errors);
                            });
                    }
                    return setErrors(['Errors in editing the current Vacation Spot']);
                };

                const handleDelete = (e) => {
                    e.preventDefault();
                    if (sessionUser) {
                        setErrors([]);
                        return dispatch(spotActions.deleteSpot({ spotId, sessionUser }))
                            .then(() => history.push('/'))
                            .catch(async (res) => {
                                const data = await res.json();
                                if (data && data.errors) setErrors(data.errors);
                            });
                    }
                    return setErrors(['Errors in deleting the current Vacation Spot']);
                };


                return (
                    <div className='edit-spot__container'>
                        <h1>Edit {currentSpot.spotName}'s Page</h1>
                        <form className='edit-spot__form' onSubmit={handleSubmit}>
                            <ul>
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={spotName || ''}
                                    onChange={(e) => setSpotName(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Activities:
                                <textarea
                                    value={activities || ''}
                                    onChange={(e) => setActivities(e.target.value)}
                                />
                            </label>
                            <label>
                                Location:
                                <input
                                    type="text"
                                    value={location || ''}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Picture URL:
                                <input
                                    type="url"
                                    value={pictureURL || ''}
                                    onChange={(e) => setPictureURL(e.target.value)}
                                />
                            </label>
                            <button type="submit">Post a Vacation Spot</button>
                        </form>
                        <button type="submit" onClick={handleDelete}>Delete</button>
                    </div>
                );
            }
          
        }

    }

    return (<></>);

}

export default VacationSpotEdit;