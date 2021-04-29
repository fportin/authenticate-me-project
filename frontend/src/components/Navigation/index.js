import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal'
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        history.push(`/`)
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
                <NavLink className='signup-button' to="/signup">Sign Up</NavLink>
                <LoginFormModal />
            </>
        );
    }

    return (
        <div className='navbar__container'>
            <h1 className='logo' onClick={handleClick}>FunFinder🔎</h1>
            <ul>
            
                    <NavLink className='navbar-home' exact to="/">Home</NavLink>
                    {isLoaded && sessionLinks}

            </ul>
        </div>
    );
}

export default Navigation;