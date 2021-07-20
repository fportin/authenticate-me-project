import React from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal'
import Searchbar from '../Searchbar'
import * as spotActions from "../../store/vacation-spots";
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const location = useLocation()
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('currentSearchWord')
        history.push(`/`)
        dispatch(spotActions.getSpots())
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
            <NavLink className='navbar-post' exact to="/create-spot">Post A Vacation Spot</NavLink>
            <ProfileButton user={sessionUser} />
            </>
        );
    } else {
        sessionLinks = (
            <>
                <NavLink className='signup-button' exact to="/signup">Sign Up</NavLink>
                <LoginFormModal />
            </>
        );
    }

    let searchBarActive;
    if (location.pathname !== '/' && location.pathname !== '/search') {
        searchBarActive = (
            <>
            <Searchbar /> 
            </>
        )
    }
    
    const navBar = document.querySelector('.navbar__container')
    if (location.pathname.match(/\/spots\/\d+/) || location.pathname.match("/create-spot")) {
        navBar?.classList.add('navbar-spots')
    } else {
        navBar?.classList.remove('navbar-spots')
    }

    return (
        <div className='navbar__container'>
            <h1 className='logo' onClick={handleClick}>FunFinder🔎</h1>
            <ul>
            
                { searchBarActive }
                {/* <NavLink className='navbar-home' exact to="/" onClick={handleClick}>Home</NavLink> */}
                {isLoaded && sessionLinks}

            </ul>
        </div>
    );
}

export default Navigation;