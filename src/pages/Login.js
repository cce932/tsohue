import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import "shared/style/login.scss"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"

import { login } from "actions/auth"

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

  const next = new URL(window.location.href).searchParams.get("next")

  if (isLoggedIn) {
    window.location = next ? next : "/"
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
    // 如果登入資訊沒錯
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(account, password))
        .then(() => {
          window.location = next ? next : "/"

          // props.history.push("/member") // 成功就跳轉頁面
          window.location.reload()
        })
        .catch((error) => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }

  return (
    // ref的form來自 form=useRef()
    <div className="container pages">
      <div className={`login`}>
        <Form onSubmit={handleLogin} ref={form}>
          <label htmlFor="account">帳號</label>
          <Input
            type="text"
            name="account"
            value={account}
            onChange={onChangeAccount}
            validations={[required]}
          />

          <label htmlFor="password">密碼</label>
          <Input
            type="text"
            name="password"
            value={password}
            onChange={onChangePassword}
            validations={[required]}
          />

          <button type="submit" disabled={loading}>
            {loading && ( // 如果正在loading的話 那就不能按此button
              // <span className='spinner-border spinner-border-sm'></span> // boostrape的寫法 顯示loading icon
              <span>登入中</span>
            )}
            <span>確定</span>
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
