import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as spotActions from "../../store/vacation-spots";
import SpotTile from "../SpotTile";
import Searchbar from '../Searchbar'
import './FrontPage.css';

function FrontPage() {
    const dispatch = useDispatch();

    document.body.classList.remove('body-spot-page');
    document.documentElement.classList.remove('body-spot-page');

    useEffect(() => {
        dispatch(spotActions.getSpots())
    }, [dispatch]);


    // function success(pos) {
    //     var crd = pos.coords;

    //     console.log('Your current position is:');
    //     console.log(`Latitude : ${crd.latitude}`);
    //     console.log(`Longitude: ${crd.longitude}`);
    //     console.log(`More or less ${crd.accuracy} meters.`);
    // }

    // console.log(navigator.geolocation.getCurrentPosition(success))
        

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