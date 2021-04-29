import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import * as spotActions from "../../store/vacation-spots";
import './Searchbar.css'


function Searchbar() {
    const dispatch = useDispatch()
    const allSpots = useSelector((state) => state.places.allSpots);
    const [searchWord, setSearchWord] = useState("")

    useEffect(() => {
        const searchDelay = setTimeout(() => {
            dispatch(spotActions.getSpots(searchWord))
        }, 1000)

        return () => clearTimeout(searchDelay)
    }, [searchWord, dispatch])
    
    useEffect(() => {
        const data = localStorage.getItem('currentSearchWord');
        if (data) {
            setSearchWord(data)
        }
    }, [])
    
    useEffect(() => {
        localStorage.setItem('currentSearchWord', searchWord)
    }, [searchWord]);

    const handleClear = (e) => {
        e.preventDefault()
        setSearchWord('')
    }
    
    return (
        <div className='search-bar__container'>
            <input 
                className='search-bar'
                placeholder='Search for your next destination here...'
                type='text'
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
            />
            <button type='reset' onClick={handleClear}>Clear</button>
        </div>
    )
}


export default Searchbar