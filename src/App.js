import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Router, Switch, Route, Link } from "react-router-dom"

import './App.css';

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
      <div>
        <nav>
          <Link to={'/'}>
            Index
          </Link>
          <div>
            <li>
              <Link to={'/home'}>
                主頁
              </Link>
            </li>
          </div>


          {currentUser ? (
            // 如果currentUser存在(已登入)
            // 就顯示member頁面
            <div>
              <li>
                <Link to={'/member'}>
                  會員({currentUser.username})
                </Link>
              </li>
            </div>
          ) : (
              // 沒登入 就顯示點擊「會員」就會跳到註冊
              <div>
                <li>
                  <Link to={'/register'}>
                    會員（註冊）
                  </Link>
                </li>
              </div>
            )}
        </nav>
      </div>

      <div>
        {/* 每個路徑 對應到的Component */}
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
