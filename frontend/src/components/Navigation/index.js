import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal'
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

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
                <LoginFormModal />
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (
        <div className='navbar__container'>
            <ul>
                <li>
                    <NavLink className='navbar-home' exact to="/">Home</NavLink>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
            <h1 className='logo'>FunFinder🔎</h1>
        </div>
    );
}

export default Navigation;