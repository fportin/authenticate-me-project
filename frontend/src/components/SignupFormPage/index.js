import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    document.body.classList.add('body-spot-page');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    const handleCancel = (e) => {
        e.preventDefault()
        history.push('/')
    }

    return (
        <div className='signup-page__container'>
            <div className='signup-page__title'>Create your Account</div>
            <hr />
            <div className='signup-page__form-container'>
                <ul className='signup-page-form-errors'>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <span className='signup-page__find'>Find</span> <span className='signup-page__your'>your</span> <span className='signup-page__escape'>Escape.</span>
                <form className='signup-page__form' onSubmit={handleSubmit}>
                    <label className='signup-page__form-label'>
                        Email:
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='signup-page__form-box'
                            required
                        />
                    </label>
                    <label className='signup-page__form-label'>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='signup-page__form-box'
                            required
                        />
                    </label>
                    <label className='signup-page__form-label'>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='signup-page__form-box'
                            required
                        />
                    </label>
                    <label className='signup-page__form-label'>
                        Confirm Password:
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='signup-page__form-box'
                            required
                        />
                    </label>
                    <div className='signup-btn-container'>
                        <button className='signup-btn' type='submit'>Sign Up</button>
                        <button className='signup-btn' type='button' onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupFormPage;