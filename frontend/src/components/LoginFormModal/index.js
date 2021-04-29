import React, { useState } from 'react'

import LoginForm from './LoginForm'
import { Modal } from '../../context/Modal'
import './LoginForm.css'


const LoginFormModal = () => {

    const [showModal, setShowModal] = useState(false)

    const handleOnClick = e => {
        setShowModal(true)
    }

    const handleOnClose = e => {
        setShowModal(false)
    }
    

    if (showModal) return (
        <Modal onClose={handleOnClose}>
            <LoginForm />
        </Modal>
    )

    return (
        <button className='login-button' onClick={handleOnClick}>Log In</button>
    )
}


export default LoginFormModal
