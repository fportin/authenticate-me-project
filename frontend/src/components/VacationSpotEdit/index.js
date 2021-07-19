import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";

import * as spotActions from "../../store/vacation-spots";
import * as spotLocationActions from "../../store/spot-location";
import './VacationSpotEdit.css';

function VacationSpotEdit({ close }) {
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
        const data = localStorage.getItem('currentSpot');

        if (data) {
            setSpotName(currentSpot?.spotName)
            setActivities(currentSpot?.activities);
            setLocation(currentSpot?.location);
            setPictureURL(currentSpot?.pictureURL);
        }
    }, [currentSpot])
    
    useEffect(() => {
        localStorage.setItem('currentSpot', JSON.stringify(currentSpot))
    });



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
                            .then((res) => {
                                const { id, location } = res
                                dispatch(spotLocationActions.updateSpotLocation({ id, location }))
                            })
                            .then(() => close())
                            .catch(async (res) => {
                                const data = await res.json();
                                if (data && data.errors) setErrors(data.errors);
                            });
                    }
                    return setErrors(['Errors in editing the current Vacation Spot']);
                };

                const handleCancel = (e) => {
                    e.preventDefault();
                    close()
                }

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
                        <div className='edit-spot-title'>Edit {currentSpot.spotName}'s Page
                            <ul className='edit-spot-form-errors'>
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                        </div>
                        <form className='edit-spot__form' onSubmit={handleSubmit}>
                            <label className='edit-spot-form-label'>
                                Name:
                                <input
                                    type="text"
                                    value={spotName || ''}
                                    onChange={(e) => setSpotName(e.target.value)}
                                    placeholder="The Name of the Place."
                                    className='edit-spot-form-box'
                                    required
                                />
                            </label>
                            <label className='edit-spot-form-label'>
                                Activities:
                                <textarea
                                    value={activities || ''}
                                    onChange={(e) => setActivities(e.target.value)}
                                    placeholder="Things you could do at this location."
                                    className='edit-spot-form-box activities'
                                />
                            </label>
                            <label className='edit-spot-form-label'>
                                Location:
                                <input
                                    type="text"
                                    value={location || ''}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Address/Town/City/State/Country"
                                    className='edit-spot-form-box'
                                    required
                                />
                            </label>
                            <label className='edit-spot-form-label'>
                                Picture URL:
                                <input
                                    type="url"
                                    value={pictureURL || ''}
                                    onChange={(e) => setPictureURL(e.target.value)}
                                    placeholder="URL of the place's image. (Use a 4K image for best results)"
                                    className='edit-spot-form-box'
                                />
                            </label>
                            <div className='edit-spot-form-btn__container'>
                                <button className='edit-spot-form-btn' type="submit">Submit</button>
                                <button className='edit-spot-form-btn' type="reset" onClick={handleCancel}>Cancel</button>
                                <button className='edit-spot-form-btn delete' type="button" onClick={handleDelete}>Delete</button>
                            </div>
                        </form>
                    </div>
                );
            }
          
        }

    }

    return (<></>);

}

export default VacationSpotEdit;