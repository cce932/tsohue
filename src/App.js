import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Router, Switch, Route, Link } from "react-router-dom"
import { FaShoppingCart, FaUser, FaHeart } from "react-icons/fa"
import $ from "jquery"

import "shared/style/app.scss"
import Home from "pages/Home"
import Login from "pages/Login"
import Register from "pages/Register"
import Member from "pages/Member"
import Recipes from "pages/Recipes"
import { clearMessage } from "actions/message"
import { history } from "helpers/history"
import {
  allPaths,
  home,
  login,
  register,
  member,
  recipes,
} from "shared/constants/pathName"

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // url換了的話(when changing location) 就要清空redux state 內的 message
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage())
    })
  }, [dispatch])

  $(window).scroll(function () {
    if ($(this).scrollTop() < $("#footer").offset().top / 2) {
      $("#side-list").fadeIn("fast")
    } else {
      $("#side-list").fadeOut("fast")
    }
  })

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
              <Link to={allPaths[recipes]}>{recipes}</Link>
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
                  <FaUser />
                </Link>
              </li>
            ) : (
              // 沒登入 就顯示點擊「會員」就會跳到註冊
              <li>
                <Link to={allPaths[register]}>
                  <FaUser />
                </Link>
              </li>
            )}

            {/* shopping cart */}
            <li>
              <Link className="icon" to={"#"}>
                <FaShoppingCart size="18px" />
              </Link>
            </li>

            {/* like */}
            {currentUser && (
              <li>
                <Link className="icon" to={"#"}>
                  <FaHeart />
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {/* 每個路徑 對應到的Component */}
      <Switch>
        <Route exact path={["/", allPaths[home]]} component={Home} />
        <Route exact path={allPaths[login]} component={Login} />
        <Route exact path={allPaths[register]} component={Register} />
        <Route exact path={allPaths[member]} component={Member} />
        <Route exact path={allPaths[recipes]} component={Recipes} />
      </Switch>
    </Router>
  )
}

export default App
