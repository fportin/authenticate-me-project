import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
import profileIcon from "../../profile-icon.png"
import navtriangle from "../../nav-triangle.png"
import './Navigation.css';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <div className='dropdown'>
            <div style={{ backgroundImage: `url(${profileIcon})` }} onClick={openMenu} className="profile-icon">
            {showMenu && (
                <>
                <img className="triangle-icon" src={navtriangle} alt='dropdown arrow'/>
                <ul className="profile-dropdown">
                    <li>User: {user.username}</li>
                    <li>Email: {user.email}</li>
                            <button onClick={logout} className="logout-btn">Log Out</button>
                </ul>
                </>
            )}
            </div>
        </div>
    );
}

export default ProfileButton;