import $ from 'jquery'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useHistory } from 'react-router-dom'
import {
  FaShoppingCart,
  FaUser,
  FaHeart,
} from 'react-icons/fa'
import { BsChevronUp } from 'react-icons/bs'
import { Nav, Navbar } from 'react-bootstrap'
// import { OverlayTrigger } from "react-bootstrap"

import 'bootstrap/dist/css/bootstrap.min.css'
import 'shared/style/components/checkbox.scss'
import 'shared/style/app.scss'
import SearchBar from 'shared/components/SearchBar'
import Home from 'pages/Home'
import Login from 'pages/Login'
import Register from 'pages/Register'
import Member from 'pages/Member'
import OrderOverview from 'pages/OrderOverview'
import Profile from 'pages/Profile'
import Empty from 'shared/components/Empty'
import Recipes from 'pages/Recipes'
import RecipeDetail from 'pages/RecipeDetail'
import NotFound from 'pages/NotFound'
import ShoppingCart from 'pages/ShoppingCart'
import Order from 'pages/Order'
import OrderDetail from 'pages/OrderDetail'
import OrderSuccess from 'pages/Order/OrderSuccess'
import AboutUs from 'pages/StaticPages/AboutUs'
import Vip from 'pages/StaticPages/Vip'
// import CartPopup from "pages/ShoppingCart/popup"
import { clearMessage } from 'actions/message'
import { loadRecipes } from 'actions/load'
import {
  allPaths,
  home,
  login,
  register,
  member,
  profile,
  coupons,
  recipes,
  recipe,
  recipeNotFound,
  shoppingCart,
  order,
  orderOverview,
  orderDetail,
  vip,
  aboutUs,
  QA as QAPathname,
  policies,
  privacy,
  position,
} from 'shared/constants/pathName'
import Instruction from 'pages/StaticPages/Instruction'
import QA from 'pages/StaticPages/QA'
import Policy from 'pages/StaticPages/Policies'
import Privacy from 'pages/StaticPages/Privacy'
import color from 'shared/style/color'

const App = () => {
  const { user: currentUser } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(loadRecipes())
  }, [dispatch])

  useEffect(() => {
    dispatch(clearMessage())
  }, [history.location.pathname])

  // needed, for excuting when DOM is ready
  $(() => {
    $(window).on('scroll', function () {
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
        $('#to-top')
          .css('visibility', 'hidden')
          .fadeIn('slow')
      } else {
        $('#to-top')
          .css('visibility', 'visible')
          .fadeIn('slow')
      }

      // if the distance btw [bottom of screen] and [bottom of page] is smaller than 300px
      // turn the position to absolute
      const scrollBottom =
        $('.cart').outerHeight(true) - $(window).height() - $(window).scrollTop()

      if (scrollBottom < 50) {
        $('#cart-bottom')
          .css('position', 'absolute')
          .css('bottom', '10px')
      } else {
        $('#cart-bottom')
          .css('position', 'fixed')
          .css('bottom', '10px')
      }
    })

    $('#to-top').on('click', function () {
      $('html,body').animate({ scrollTop: 0 }, 'fast') /* 返回到最頂上 */
      return false
    })
  })

  return (
    <>
      <Navbar fixed="top" expand="lg" className="ts-header">
        <Navbar.Brand href="/">
          <img className="logo" src="/nav-pic/logo.svg" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <SearchBar at="nav" />
          <Nav
          // className="ml-10 my-lg-0"
          >
            <Nav.Link href={allPaths[vip]} className="nav-text">
              {vip}
            </Nav.Link>
            <Nav.Link href={allPaths.event} className="nav-text">
              特價活動
            </Nav.Link>
            <Nav.Link href={allPaths.instruction} className="nav-text">
              聲控APP
            </Nav.Link>
            <Nav.Link href={allPaths[recipes]} className="nav-text">
              {recipes}
            </Nav.Link>

            {/* div is for max-width 992: place in one row */}
            <div>
              <Nav.Link
                className="ts-icon-feature"
                href={
                  currentUser
                    ? allPaths[member] + allPaths[orderOverview]
                    : allPaths[register]
                }
              >
                <FaUser />
              </Nav.Link>

              {
                // <li>
                //   {/* <OverlayTrigger placement="bottom" overlay={<CartPopup />}> */}
                //   <button className="icon">
                //     <Link
                //       className="icon"
                //       to={currentUser ? allPaths[shoppingCart] : allPaths[login]}
                //     >
                //       <FaShoppingCart size="18px" />
                //     </Link>
                //   </button>
                //   {/* </OverlayTrigger> */}
                // </li>
              }
              <Nav.Link
                href={currentUser ? allPaths[shoppingCart] : allPaths[login]}
                className="ts-icon-feature"
              >
                <FaShoppingCart size="18px" />
              </Nav.Link>

              <Nav.Link href={allPaths.favorite} className="ts-icon-feature">
                <FaHeart />
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <a href="#" id="to-top">
        <BsChevronUp fill={color.vice} size="25px" />
      </a>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path={allPaths[login]} element={<Login />} />
        <Route exact path={allPaths[register]} element={<Register />} />
        <Route path={allPaths[member]} element={<Member />}>
        <Route
            path={allPaths[orderOverview]}
            element={<OrderOverview />} />
          <Route
            path={allPaths[profile]}
            element={<Profile {...{ ...currentUser }} />}
          />
          <Route
            path={allPaths[coupons]}
            element={
              <div>
                <Empty message="您目前沒有優惠券喔" />
              </div>
            }
          />
        </Route>
        <Route exact path={allPaths[recipes]} element={<Recipes />} />
        <Route
          exact
          path={allPaths[recipeNotFound]}
          element={<NotFound message="抱歉 此烹飪包已經下架囉～" />}
        />
        <Route exact path={allPaths[recipe] + ':id'} element={<RecipeDetail />} />
        <Route exact path={allPaths[shoppingCart]} element={<ShoppingCart />} />
        <Route exact path={allPaths[order]} element={<Order />} />
        <Route exact path={allPaths.orderSuccess} element={<OrderSuccess />} />
        <Route exact path={allPaths[vip]} element={<Vip />} />
        <Route exact path={allPaths.instruction} element={<Instruction />} />
        <Route
          exact
          path={allPaths[orderDetail] + ':id'}
          element={<OrderDetail />}
        />
        <Route exact path={allPaths[aboutUs]} element={<AboutUs />} />
        <Route exact path={allPaths[QAPathname]} element={<QA />} />
        <Route exact path={allPaths[policies]} element={<Policy />} />
        <Route exact path={allPaths[privacy]} element={<Privacy />} />
        <Route
          exact
          path={allPaths[position]}
          element={
            <div className="pages container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14461.716049522005!2d121.5484174!3d25.0195109!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442aa2176c4c0ad%3A0x90db5e44ee29f455!2z5ZyL56uL6Ie654Gj56eR5oqA5aSn5a24!5e0!3m2!1szh-TW!2stw!4v1621672373986!5m2!1szh-TW!2stw"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="ts-position"
              />
            </div>
          }
        />
        <Route path={''} element={<NotFound message="敬請期待 新功能即將上線" />} />
      </Routes>
    </>
  )
}

export default App
