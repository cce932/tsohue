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
// import { OverlayTrigger } from "react-bootstrap"

import "bootstrap/dist/css/bootstrap.min.css"
import "shared/style/components/checkbox.scss"
import "shared/style/app.scss"
import Home from "pages/Home"
import Login from "pages/Login"
import Register from "pages/Register"
import Member from "pages/Member"
import Recipes from "pages/Recipes"
import RecipeDetail from "pages/RecipeDetail"
import NotFound from "pages/NotFound"
import ShoppingCart from "pages/ShoppingCart"
import Order from "pages/Order"
import OrderDetail from "pages/OrderDetail"
import OrderSuccess from "pages/Order/OrderSuccess"
// import CartPopup from "pages/ShoppingCart/popup"
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
  shoppingCart,
  order,
  orderOverview,
  orderDetail,
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
      // if (
      //   // 當畫面的2/3滑過footer的上緣
      //   $(this).scrollTop() + ($(this).height() * 2) / 3 <
      //   $("#footer").offset().top
      // ) {
      //   $("#side-list").fadeIn("fast")
      // } else {
      //   $("#side-list").fadeOut("fast")
      // }

      if ($(this).scrollTop() < 300) {
        $("#to-top").css("visibility", "hidden").fadeIn("slow")
      } else {
        $("#to-top").css("visibility", "visible").fadeIn("slow")
      }

      // if the distance btw [bottom of screen] and [bottom of page] is smaller than 300px
      // turn the position to absolute
      let scrollBottom =
        $(document).height() - $(window).height() - $(window).scrollTop()
      if (scrollBottom < 325) {
        $("#cart-bottom").css("position", "absolute").css("bottom", "45px")
      } else {
        $("#cart-bottom").css("position", "fixed").css("bottom", "20px")
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
                <button className="search" onClick={searchOnClick}>
                  <FaSearch fill="#755734" />
                </button>
              ) : (
                <button className="search" onClick={clearOnClick}>
                  <CgClose stroke-width="2px" fill="#755734" />
                </button>
              )}
            </li>
            <li>
              <Link to={allPaths.event}>特價活動</Link>
            </li>
            <li>
              <Link to={allPaths.sale}>惜福良品</Link>
            </li>
            <li>
              <Link to={allPaths[recipes]}>{recipes}</Link>
            </li>
            <li>
              <Link to={allPaths.instruction}>訂購流程</Link>
            </li>
            <li>|</li>

            <li>
              <button className="icon">
                <Link
                  to={
                    currentUser
                      ? allPaths[member] + allPaths[orderOverview]
                      : allPaths[register]
                  }
                >
                  <FaUser />
                </Link>
              </button>
            </li>

            <li>
              {/* <OverlayTrigger placement="bottom" overlay={<CartPopup />}> */}
                <button className="icon">
                  <Link
                    className="icon"
                    to={currentUser ? allPaths[shoppingCart] : allPaths[login]}
                  >
                    <FaShoppingCart size="18px" />
                  </Link>
                </button>
              {/* </OverlayTrigger> */}
            </li>

            <li>
              <button className="icon">
                <Link className="icon" to={allPaths.favorite}>
                  <FaHeart />
                </Link>
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#" id="to-top">
        <FaAngleUp fill="#fbd779" size="30px" />
      </a>

      {/* 每個路徑 對應到的Component */}
      <Switch>
        <Route exact path={["/", allPaths[home]]} component={Home} />
        <Route exact path={allPaths[login]} component={Login} />
        <Route exact path={allPaths[register]} component={Register} />
        <Route path={allPaths[member]} component={Member} />
        <Route exact path={allPaths[recipes]} component={Recipes} />
        <Route
          exact
          path={allPaths[recipeNotFound]}
          render={() => <NotFound message="抱歉 此烹飪包已經下架囉～" />}
        />
        <Route exact path={allPaths[recipe] + ":id"} component={RecipeDetail} />
        <Route exact path={allPaths[shoppingCart]} component={ShoppingCart} />
        <Route exact path={allPaths[order]} component={Order} />
        <Route exact path={allPaths.orderSuccess} component={OrderSuccess} />
        <Route
          exact
          path={allPaths[orderDetail] + ":id"}
          component={OrderDetail}
        />
        <Route
          path={""}
          render={() => <NotFound message="敬請期待 新功能即將上線" />}
        />
      </Switch>
    </Router>
  )
}

export default App
