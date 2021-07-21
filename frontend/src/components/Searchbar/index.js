import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import * as spotActions from "../../store/vacation-spots";
import searchIcon from "../../search-icon.png"
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
        
        if (data && data !== searchWord) {
            setSearchWord(data)
            setSearchActive(true)
        } else if (!data) {
            setSearchWord("")
        }
    }, [allSpots])

    
    const activateSearch = () => {
        if (searchWord) {
            localStorage.setItem('currentSearchWord', searchWord)
            if (location.pathname !== '/') {
                history.push(`/`)
            }
            setSearchActive(true)
        }
        
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
        localStorage.removeItem('currentSearchWord')
        setSearchWord('')
        setSearchActive(true)
    }
    
    let resetButtonActive;
    if (location.pathname === '/') {
        let searchBarCon = document.querySelector('.search-bar__container')
        let searchBarBox = document.querySelector('.search-bar')
        let searchBarButton = document.querySelector('.search-button')
        
        resetButtonActive = (
            <button type='reset' onClick={handleReset} className='reset-button'>CLEAR</button>
        )
        searchBarCon?.classList.add('front-page')
        searchBarBox?.classList.add('search-bar__front-page')
        searchBarButton?.classList.add('search-button__front-page')
        searchBarCon?.classList.remove('search-bar__container')
        searchBarBox?.classList.remove('search-bar')
        searchBarButton?.classList.remove('search-button')
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
            <div style={{ backgroundImage: `url(${searchIcon})` }} onClick={handleClick} className='search-button' />
            { resetButtonActive }
        </div>
    )
}


export default Searchbar