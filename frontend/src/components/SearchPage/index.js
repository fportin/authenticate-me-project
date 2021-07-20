import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as spotActions from "../../store/vacation-spots";
import SpotTile from "../SpotTile";
import Searchbar from '../Searchbar'
import './SearchPage.css';

function SearchPage() {
    document.body.classList.remove('body-spot-page');

    return (
        <>
            <Searchbar />
            <div className='search-page__container'>
                <SpotTile />
            </div>
        </>
    );
}



export default SearchPage;