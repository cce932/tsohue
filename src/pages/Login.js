import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

import "shared/style/login.scss"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"

import { login } from "actions/auth"

// 限制帳號密碼格式
// 如果格式輸入沒錯 就發成功的action
// 處理dispatch有沒有成功

const required = (value) => {
  if (!value) {
    return <div className="alert">不可空白喔</div>
  }
}

const Login = (props) => {
  const form = useRef()
  const checkBtn = useRef()

  const [account, setAccount] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { isLoggedIn } = useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.messages)

  const dispatch = useDispatch()

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
    // 如果登入資訊沒錯
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(account, password)) // 發送login的action
        .then(() => {
          props.history.push("/member") // 成功就跳轉頁面
          window.location.reload()
        })
        .catch((error) => {
          console.log("Login.js login fail:", error)
          setLoading(false)
        })
    } else {
      console.log("enter error")
      setLoading(false)
    }

    if (isLoggedIn) {
      return <Redirect to="/member" /> // Redirect跳轉頁面 來自React-router-dom
    }
  }

  return (
    // ref的form來自 form=useRef()
    <div className={`container`}>
      <div className={`login`}>
        <Form onSubmit={handleLogin} ref={form}>
          <label htmlFor="account">Account</label>
          <Input
            type="text"
            name="account"
            value={account}
            onChange={onChangeAccount}
            validations={[required]}
          />

          <label htmlFor="password">Password</label>
          <Input
            type="text"
            name="password"
            value={password}
            onChange={onChangePassword}
            validations={[required]}
          />

          <button disabled={loading}>
            {loading && ( // 如果正在loading的話 那就不能按此button
              // <span className='spinner-border spinner-border-sm'></span> // boostrape的寫法 顯示loading icon
              <span>Loading...</span>
            )}
            <span>Login</span>
          </button>

          {message && <div className="message">{message}</div>}

          {/* 用來控制validation的 */}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  )
}

export default Login
