import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Router, Switch, Route, Link } from "react-router-dom"

import './App.css';

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Member from './components/Member'
import BoardUser from './components/BoardUser'

import { logout } from './actions/auth'
import { clearMessage } from './actions/message'

import { history } from './helpers/history'

const App = () => {
    const { user: currentUser } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    // url換了的話(when changing location) 就要清空redux state 內的 message
    // useEffect(() => {
    //     history.listen((location) => {
    //         dispatch(clearMessage())
    //     })
    // }, [dispatch])

    const logOut = () => {
        dispatch(logout())
    }

    return (
        <Router history={history}>
            <div>
                <nav>
                    <Link to={'/'}>
                        bezKoder
                    </Link>
                    <div>
                        <li>
                            <Link to={'/home'}>
                                Home
                            </Link>
                        </li>
                        {currentUser && (
                            <li>
                                <Link to={'/user'}>
                                    User
                                </Link>
                            </li>
                        )}
                    </div>

                    
                    {currentUser ? (
                        // 如果currentUser存在(已登入)
                        // 就顯示member頁面
                        <div>
                            <li>
                                <Link to={'/member'}>
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li>
                                {/* 如果以登入 那要顯示logout的選項 按了之後內部資料透過onClick登出 並跳轉到/login */}
                                <Link to={'/login'} onClick={logOut}>
                                    LogOut
                                </Link>
                            </li>
                        </div>
                    ) : (
                        <div>
                            <li>
                                <Link to={'/login'}>
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to={'/register'}>
                                    Register
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
                    <Route exact path='/user' component={BoardUser} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
