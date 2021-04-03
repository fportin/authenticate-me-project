import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './LoginForm.css'
import * as sessionActions from '../../store/session';
import GreetingPage from '../GreetingPage'

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <GreetingPage greet='Welcome back,' />
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        
        return dispatch(sessionActions.login({ credential, password}))
            .catch(async(res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });

    }

    return (
        <div className='login-page__container'>
            <form className='login-page__form' onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Username or Email:
                    <input type='text' value={credential} onChange={(e) => setCredential(e.target.value)} required/>
                </label>
                <label>
                    Password:
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </label>
                <button type='submit'>Log In</button>
            </form>
        </div>
    )
};



export default LoginFormPage;