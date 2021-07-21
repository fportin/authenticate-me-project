import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './GreetingPage.css'
import * as sessionActions from '../../store/session';
import ReviewForm from '../ReviewForm';


const GreetingPage = (props) => {
    // const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    document.body.classList.add('body-spot-page');

    useEffect(() => { 
        if (sessionUser) {
            const timeout = setTimeout(() => {
                history.goBack();
            }, 3000)
            return ()=> clearTimeout(timeout);
        }
    }, [sessionUser, history])
    if (sessionUser) return (
        <div className='greeting-page__container'>
        <h1 className='greeting-page'>Hello, {sessionUser.username}!</h1>
        </div>
    )

  
};



export default GreetingPage;