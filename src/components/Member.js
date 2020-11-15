import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Errored: member改大寫。 React Hook "useSelector" is called in function "member" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter
const Member = () => {
    const { user: currentUser } = useSelector((state) => state.auth)
    // const [account, setAccount] = useState('')
    // const [email, setEmail] = useState('')
    // const [username, setUsername] = useState('')



    // useState, useEffect 這些Hook的東西都不能called conditionally 一定要每個components都一樣都有
    if (!currentUser) {
        return <Redirect to='/login' />
    }

    return (
        <div className='member'>
            <header className='header'>
                <h3>
                    <strong>{currentUser.username}</strong> Profile
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
    )
}

export default Member