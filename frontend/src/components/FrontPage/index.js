import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

import * as spotActions from "../../store/vacation-spots";
import SpotTile from "../SpotTile";
import Searchbar from '../Searchbar'
import './FrontPage.css';

function FrontPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allSpots = useSelector((state) => state.places.allSpots);
    const sessionUser = useSelector((state) => state.session.user);
    const allReviews = useSelector((state) => state.reviews.allReviews);
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        dispatch(spotActions.getSpots())
    }, [dispatch]);



        

    return (
        <> 
            <Searchbar />
            <div className='front-page__container'>
                <SpotTile />
            </div>
        </>
    );
}



export default FrontPage;