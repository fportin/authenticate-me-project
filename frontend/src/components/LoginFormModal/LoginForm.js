import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './LoginForm.css'
import * as sessionActions from '../../store/session';

const LoginForm = ({ close }) => {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    
        
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        return dispatch(sessionActions.login({ credential, password }))
            .then(() => history.push('/greeting'))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });

    }

    const demoLogin = (e) => {
        e.preventDefault();
        setErrors([])
        return dispatch(sessionActions.login({ credential: 'Light', password: 'MaliMali1133'}))
            .then(() => history.push('/greeting'))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });

    }

    

    return (
        <div className='login-page__container'>
            <form className='login-page__form' onSubmit={handleSubmit}>
                <div className="login-page__greeting">Please sign in to your <span className='login-page-logo'>FunFinder🔎</span> account.</div>
                <div className="login-page__errors">
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>
                <div className='login-page-inputs__container'>
                    <label className='login-page-username-label'>
                        Username or Email:
                        <input className='login-page-input-box' type='text' value={credential} onChange={(e) => setCredential(e.target.value)} required />
                    </label>
                    <label className='login-page-password-label'>
                        Password:
                        <input className='login-page-input-box' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                </div>
                <div className='login-btn-container'>
                    <button className='login-btn' type='submit'>Log In</button>
                    <button className='login-cancel-btn' type='button' onClick={(e) => close(false)}>Cancel</button>
                </div>
                <button className='demo-user__button' type='submit' onClick={demoLogin}>Login as Demo User</button>
            </form>
        </div>
    )
};



export default LoginForm;