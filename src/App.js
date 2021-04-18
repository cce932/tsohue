import $ from "jquery"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Router, Switch, Route, Link } from "react-router-dom"
import {
  FaShoppingCart,
  FaUser,
  FaHeart,
  FaSearch,
  FaAngleUp,
} from "react-icons/fa"
import { CgClose } from "react-icons/cg"

import "bootstrap/dist/css/bootstrap.min.css"
import "shared/style/app.scss"
import Home from "pages/Home"
import Login from "pages/Login"
import Register from "pages/Register"
import Member from "pages/Member"
import Recipes from "pages/Recipes"
import RecipeDetail from "pages/RecipeDetail"
import RecipeNotFound from "pages/RecipeNotFound"
import { clearMessage } from "actions/message"
import { history } from "helpers/history"
import { loadRecipes } from "actions/load"
import {
  allPaths,
  home,
  login,
  register,
  member,
  recipes,
  recipe,
  recipeNotFound,
} from "shared/constants/pathName"

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [isEmpty, setIsEmpty] = useState(true)

  // url換了的話(when changing location) 就要清空redux state 內的 message
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage())
    })
    dispatch(loadRecipes())
  }, [dispatch])

  // needed, for excuting when DOM is ready
  $(() => {
    $(window).on("scroll", function () {
      if (
        // 當畫面的2/3滑過footer的上緣
        $(this).scrollTop() + ($(this).height() * 2) / 3 <
        $("#footer").offset().top
      ) {
        $("#side-list").fadeIn("fast")
      } else {
        $("#side-list").fadeOut("fast")
      }

      if ($(this).scrollTop() < 300) {
        $("#to-top").css("visibility", "hidden").fadeIn("fast")
      } else {
        $("#to-top").css("visibility", "visible").fadeIn("slow")
      }
    })

    $("#to-top").on("click", function () {
      $("html,body").animate({ scrollTop: 0 }, "fast") /* 返回到最頂上 */
      return false
    })

    $("#search").on("keypress", function (e) {
      // do not use "keyup", it'll cause accidient submit when typing chinese
      if (e.key === "Enter") {
        searchOnClick()
      }
    })
  })

  const searchOnClick = () => {
    history.push(`${allPaths[recipes]}?search=${$("#search").val().trim()}`)
  }

  const clearOnClick = () => {
    $("#search").val("")
    setIsEmpty(true)
    window.location.pathname.search(allPaths[recipes]) >= 0 &&
      history.push(`${allPaths[recipes]}`)
  }

  const queryOnChange = (e) => {
    setIsEmpty(e.target.value === "")
  }
  return (
    <Router history={history}>
      <header>
        <Link to={"/"} className="logo-a">
          <img className="logo" src="/nav-pic/logo.svg" alt="logo" />
        </Link>
        <nav>
          <ul className="nav-ul">
            <li>
              <input
                type="text"
                id="search"
                onChange={queryOnChange}
                placeholder="搜尋烹飪包"
              />
              {isEmpty ? (
                <button onClick={searchOnClick}>
                  <FaSearch fill="#755734" />
                </button>
              ) : (
                <button onClick={clearOnClick}>
                  <CgClose stroke-width="2px" fill="#755734" />
                </button>
              )}
            </li>
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

      <a id="to-top">
        <FaAngleUp fill="#fbd779" size="30px" />
      </a>

      {/* 每個路徑 對應到的Component */}
      <Switch>
        <Route exact path={["/", allPaths[home]]} component={Home} />
        <Route exact path={allPaths[login]} component={Login} />
        <Route exact path={allPaths[register]} component={Register} />
        <Route exact path={allPaths[member]} component={Member} />
        <Route exact path={allPaths[recipes]} component={Recipes} />
        <Route exact path={allPaths[recipeNotFound]} component={RecipeNotFound} />
        <Route exact path={allPaths[recipe] + ":id"} component={RecipeDetail} />
      </Switch>
    </Router>
  )
}

export default App
