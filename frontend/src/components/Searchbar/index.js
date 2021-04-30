import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import * as spotActions from "../../store/vacation-spots";
import './Searchbar.css'


function Searchbar() {
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const allSpots = useSelector((state) => state.places.allSpots);
    const [searchWord, setSearchWord] = useState("")
    const [searchActive, setSearchActive] = useState(false)

    useEffect(() => {
        if (searchActive) {
            dispatch(spotActions.getSpots(searchWord))
            setSearchActive(false)
            
        }

        
    }, [searchActive, searchWord, dispatch])
    
    useEffect(() => {
        const data = localStorage.getItem('currentSearchWord');
        if (data) {
            setSearchActive(true)
        }
        setSearchWord(data)
    }, [allSpots])
    
    useEffect(() => {
        localStorage.setItem('currentSearchWord', searchWord)
    }, [searchWord]);

    const activateSearch = () => {
        if (location.pathname !== '/') {
            history.push(`/`)
        }
        setSearchActive(true)

    }

    const handleClick = (e) => {
        e.preventDefault()
        activateSearch()
    }
    
    const handleEnterKey = e => {
        if (e.key === 'Enter') {
            activateSearch()
        }
        
    }

    const handleReset = e => {
        e.preventDefault()
        setSearchWord('')
        setSearchActive(true)
    }
    
    let resetButtonActive;
    if (location.pathname === '/') {
        resetButtonActive = (
            <button type='reset' onClick={handleReset}>Reset</button>
        )
    }

    if (location.pathname === '/') {
        let searchBarEle = document.querySelector('.search-bar__container')
        
        searchBarEle?.classList.add('front-page')
    }
    
    return (
        <div className='search-bar__container'>
            <input 
                className='search-bar'
                placeholder='Search for your next destination here...'
                type='text'
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                onKeyPress={handleEnterKey}
            />
            <button type='submit' onClick={handleClick}>Search</button>
            { resetButtonActive }
        </div>
    )
}


export default Searchbar