import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { isEmail } from 'validator'

import { register } from '../actions/auth'

// 設定驗證
// dispatch action
// return 

const required = value => {
    if (!value) {
        return(
            <div className='alert'>
                請輸入驗證碼
            </div>
        )
    }
}

const validEmail = value =>{
    if(!isEmail(value)) {
        return(
            <div className='alert'>
                電子郵件格式不正確
            </div>
        )
    }
}

const validAccount = value => {
    if (value.length < 6 || value > 20) {
        return (
            <div className='alert'>
                帳號字數請介於6~20
            </div>
        )
    }
}

const validPassword = value => {
    if (value.length < 6 || value > 40 ) {
        return (
            <div className='alert'>
                密碼字數請介於6~20
            </div>
        )
    }
}

const Register = () => {
    const form = useRef()
    const checkBtn = useRef()

    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [successful, setSuccessful] = useState(false)

    const { message } = useSelector(state => {
        console.log('comp Register:',state)
        return state.messages
    })

    const dispatch = useDispatch()

    const onChangeAccount = (e) => {
        const account = e.target.value
        setAccount(account)
    }

    const onChangePassword = (e) => {
        const password = e.target.value
        setPassword(password)
    }

    const onChangeUsername = (e) => {
        const useranme = e.target.value
        setUsername(useranme)
    }

    const onChangeEmail = (e) => {
        const email = e.target.value
        setEmail(email)
    }

    const onChangePhone = (e) => {
        const phone = e.target.value
        setPhone(phone)
    }

    const handleRegister = e => {
        e.preventDefault()

        setSuccessful(false)

        // check validation functions in `validations`
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(register(account, password, username, phone, email))
                .then(() => {
                    // 不直接跳轉至login
                    setSuccessful(true)
                })
                .catch(() => {
                    setSuccessful(false)
                })
        }

    }

    return (
        <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
                <div className='form'>
                    <label>Account</label>
                    <Input
                        type='text'
                        name='account'
                        onChange={onChangeAccount}
                        value={account}
                        validations={[required, validAccount]}
                    />
                    <label>Password</label>
                    <Input
                        type='text'
                        name='password'
                        onChange={onChangePassword}
                        value={password}
                        validations={[required, validPassword]}
                    />
                    <label>Username</label>
                    <Input
                        type='text'
                        name='username'
                        onChange={onChangeUsername}
                        value={username}
                        validations={[required]}
                    />
                    <label>Email</label>
                    <Input
                        type='text'
                        name='email'
                        onChange={onChangeEmail}
                        value={email}
                        validations={[required, validEmail]}
                    />
                    <label>Phone</label>
                    <Input
                        type='text'
                        name='phone'
                        onChange={onChangePhone}
                        value={phone}
                        validations={[required]} />

                    <button>
                        { successful ? 'success' : 'unsuccess' }
                    </button>
                </div>
            )}

            {message && (
                <div className='message'>
                    {message}
                </div>
            )}

            {/* Then CheckButton helps us to verify 
            if the form validation is successful or not.
            So this button will not display on the form. */}
            <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
    )
}

export default Register
