import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Router, Switch, Route, Link } from "react-router-dom"

import "shared/style/app.scss"
import Home from "pages/Home"
import Login from "pages/Login"
import Register from "pages/Register"
import Member from "pages/Member"
import { clearMessage } from "actions/message"
import { history } from "helpers/history"
import { allPaths, home, login, register, member } from "shared/constants/pathName"

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // url換了的話(when changing location) 就要清空redux state 內的 message
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage())
    })
  }, [dispatch])

  return (
    <Router history={history}>
      <header>
        <Link to={"/"} className="logo-a">
          <img className="logo" src="/nav-pic/logo.svg" alt="logo" />
        </Link>
        <nav>
          <ul className="nav-ul">
            <li>
              <Link to={"#"}>本月特餐</Link>
            </li>
            <li>
              <Link to={"#"}>特價活動</Link>
            </li>
            <li>
              <Link to={"#"}>惜福良品</Link>
            </li>
            <li>
              <Link to={"#"}>食譜大全</Link>
            </li>
            <li>
              <Link to={"#"}>訂購流程</Link>
            </li>
            <li>|</li>

            {currentUser ? (
              // 如果currentUser存在(已登入)
              // 就顯示member頁面
              <li>
                <Link to={allPaths[member]}>
                  <img
                    className="feature-img"
                    src="/nav-pic/member.svg"
                    alt="member"
                  />
                </Link>
              </li>
            ) : (
              // 沒登入 就顯示點擊「會員」就會跳到註冊
              <li>
                <Link to={allPaths[register]}>
                  <img
                    className="feature-img"
                    src="/nav-pic/member.svg"
                    alt="register"
                  />
                </Link>
              </li>
            )}

            {/* shopping cart */}
            <li>
              <Link to={"#"}>
                <img
                  className="feature-img"
                  src="/nav-pic/cart.svg"
                  alt="shopping cart"
                />
              </Link>
            </li>

            {/* like */}
            {currentUser && (
              <li>
                <Link to={"#"}>
                  <img
                    className="feature-img"
                    src="/nav-pic/like.svg"
                    alt="like"
                  />
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {/* 每個路徑 對應到的Component */}
      <div>
        <Switch>
          <Route exact path={["/", allPaths[home]]} component={Home} />
          <Route exact path={allPaths[login]} component={Login} />
          <Route exact path={allPaths[register]} component={Register} />
          <Route exact path={allPaths[member]} component={Member} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
