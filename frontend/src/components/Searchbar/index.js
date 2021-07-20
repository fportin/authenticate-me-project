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
            if (searchWord) {
                dispatch(spotActions.getSpots(searchWord))
                setSearchActive(false)
            } 
        } else if (!searchWord && location.pathname === '/search') {
            localStorage.removeItem('currentSearchWord')
            setSearchActive(false)
            history.push("/")
        }   
        
    }, [searchActive, searchWord, dispatch])
    
    useEffect(() => {
        const data = localStorage.getItem('currentSearchWord');
        if (data) {
            setSearchWord(data)
            setSearchActive(true)
        }
    }, [])
    
    // useEffect(() => {
    // }, [searchWord]);
    
    const activateSearch = () => {
        if (searchWord) {
            localStorage.setItem('currentSearchWord', searchWord)
            if (location.pathname !== '/search') {
                history.push(`/search`)
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
    if (location.pathname === '/' || location.pathname === '/search') {
        resetButtonActive = (
            <button type='reset' onClick={handleReset} className='reset-button'>CLEAR</button>
        )
    }
    
    let searchBarCon = document.querySelector('.search-bar__container')
    let searchBarBox = document.querySelector('.search-bar')
    let searchBarButton = document.querySelector('.search-button')
    if (location.pathname === '/' || location.pathname === '/search') {
        searchBarCon?.classList.add('front-page')
        searchBarBox?.classList.add('search-bar__front-page')
        searchBarButton?.classList.add('search-button__front-page')
    } else {
        searchBarCon?.classList.remove('front-page')
        searchBarBox?.classList.remove('search-bar__front-page')
        searchBarButton?.classList.remove('search-button__front-page')
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