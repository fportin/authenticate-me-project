import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './GreetingPage.css'
import * as sessionActions from '../../store/session';
import ReviewForm from '../ReviewForm';


const GreetingPage = (props) => {
    // const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    // const [credential, setCredential] = useState('');
    // const [password, setPassword] = useState('');
    // const [errors, setErrors] = useState([]);
    //     const greet = () => {
        //         return (<Redirect to='/' />)
        // }
    const history = useHistory();

    useEffect(() => { 
        if (sessionUser) {
            const timeout = setTimeout(() => {
                history.push('/');
            }, 3000)
            return ()=> clearTimeout(timeout);
        }
    }, [sessionUser, history])

    if (sessionUser) return (
        <>
        <h1 className='greeting-page'>{props.greet} {sessionUser.username}</h1>
        </>
    )

  
};



export default GreetingPage;