import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './LoginForm.css'
import * as sessionActions from '../../store/session';

const LoginForm = () => {
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

    

    return (
        <div className='login-page__container'>
            <form className='login-page__form' onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Username or Email:
                    <input type='text' value={credential} onChange={(e) => setCredential(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type='submit'>Log In</button>
                <button className='demo-user__button' type='submit' onClick={(e) => {
                    setCredential('Light')
                    setPassword('password')
                    }}>Login as Demo User</button>
            </form>
        </div>
    )
};



export default LoginForm;