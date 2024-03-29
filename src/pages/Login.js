import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import 'shared/style/login.scss'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

import { login } from 'actions/auth'
import { allPaths, register } from 'shared/constants/pathName'
import { Spinner } from 'react-bootstrap'
import { encrypt } from 'shared/utility/common'

const required = (value) => {
  if (!value) {
    return <div className="alert">不可空白喔</div>
  }
}

const Login = (props) => {
  const form = useRef()
  const checkBtn = useRef()
  const navigate = useNavigate()

  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { isLoggedIn } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.messages)

  const dispatch = useDispatch()

  // it's not convient to use `useLocation` to get query params
  const next = new URL(window.location.href).searchParams.get('next')

  if (isLoggedIn) {
    navigate(-1, { replace: true })
  }

  const onChangeAccount = (e) => {
    const account = e.target.value
    setAccount(account)
  }

  const onChangePassword = (e) => {
    const password = e.target.value
    setPassword(password)
  }

  const handleLogin = (e) => {
    e.preventDefault()

    setLoading(true)

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(account, encrypt(password, account)))
        .then(() => {
          navigate(next || '/member')
        })
        .catch(() => {
          setLoading(false)
          window.alert('帳號或密碼錯誤囉')
        })
    } else {
      setLoading(false)
    }
  }

  return (
    // ref的form來自 form=useRef()
    <div className={'container pages login'}>
      <div className="block">
        <Form onSubmit={handleLogin} ref={form}>
          <div className="input-row">
            <label htmlFor="account">帳號</label>
            <Input
              type="text"
              name="account"
              value={account}
              onChange={onChangeAccount}
              validations={[required]}
            />
          </div>
          <div className="input-row">
            <label htmlFor="password">密碼</label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="bottom">
            <button type="submit" disabled={loading}>
              {loading
                ? (
                <Spinner animation="border" size="sm"></Spinner>
                  )
                : (
                <span>登入</span>
                  )}
            </button>

            {message && <div className="message">{message}</div>}
            <p>
              還沒加入會員嗎？<Link to={allPaths[register]}>點我註冊</Link>
            </p>
          </div>

          {/* 用來控制validation的 */}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  )
}

export default Login
