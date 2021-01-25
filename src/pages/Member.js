import React, { useEffect } from 'react'
import { Redirect, Router, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../actions/auth'
import { clearMessage } from '../actions/message'
import { history } from '../helpers/history'

// Errored: member改大寫。 React Hook "useSelector" is called in function "member" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter
const Member = () => {
    // useState, useEffect 這些Hook的東西都不能called conditionally 一定要每個components都一樣都有
    const { user: currentUser } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage())
        })
    }, [dispatch])

    if (!currentUser) {
        return <Redirect to='/login' />
    }

    const logOut = () => {
        dispatch(logout())
    }

    return (
        <Router history={history}>
            <div className='member'>
                <header className='header'>
                    <h3>
                        Hello, <strong>{currentUser.username}</strong>
                    </h3>
                </header>
                <p>
                    <strong>Id: </strong> {currentUser.id}
                </p>
                <p>
                    <strong>Username: </strong> {currentUser.username}
                </p>
                <p>
                    <strong>Email: </strong> {currentUser.email}
                </p>
                {currentUser.roles &&
                    <div>currentUser.roles</div>}
            </div>
            <Link to={'/home'} onClick={logOut}>登出</Link>
        </Router>
    )
}

export default Member