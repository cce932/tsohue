import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Router, Switch, Route, Link } from "react-router-dom"

import './shared/css/app.scss';

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Member from './components/Member'
import { clearMessage } from './actions/message'
import { history } from './helpers/history'

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
        <Link to={'/'} className='logo-a'>
          <img className='logo' src='/nav-pic/logo.svg' alt='logo' />
        </Link>
        <nav>
          <ul className='nav-ul'>
            <li>
              <Link to={'#'}>
                本月特餐
                </Link>
            </li>
            <li>
              <Link to={'#'}>
                特價活動
                </Link>
            </li>
            <li>
              <Link to={'#'}>
                惜福良品
                </Link>
            </li>
            <li>
              <Link to={'#'}>
                食譜大全
                </Link>
            </li>
            <li>
              <Link to={'#'}>
                訂購流程
                </Link>
            </li>
            <li>|</li>
          </ul>
        </nav >

        {currentUser ? (
          // 如果currentUser存在(已登入)
          // 就顯示member頁面
          < Link to={'/member'}>
            <button>
              <img className='feature-img' src='/nav-pic/member.svg' alt='member' />
            </button>
          </Link>
        ) : (
            // 沒登入 就顯示點擊「會員」就會跳到註冊
            <Link to={'/register'}>
              <button>
                <img className='feature-img' src='/nav-pic/member.svg' alt='register' />
              </button>
            </Link>
          )}

        {/* shopping cart */}
        < Link to={'#'}>
          <button>
            <img className='feature-img' src='/nav-pic/cart.svg' alt='shopping cart' />
          </button>
        </Link>

        {/* like */}
        {currentUser && (
          < Link to={'#'}>
            <button>
              <img className='feature-img' src='/nav-pic/like.svg' alt='like' />
            </button>
          </Link>
        )}
      </header>

      {/* 每個路徑 對應到的Component */}
      <div>
        <Switch>
          <Route exact path={['/', '/home']} component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/member' component={Member} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
