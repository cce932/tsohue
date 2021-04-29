import React, { useEffect } from "react"
import { Redirect, Router, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { logout } from "actions/auth"
import { clearMessage } from "actions/message"
import { history } from "helpers/history"
import "shared/style/member.scss"
import SideList from "shared/components/SideList"
import {
  allPaths,
  home,
  logout as logoutName,
  orders,
  profile,
} from "shared/constants/pathName"

// Errored: member改大寫。 React Hook "useSelector" is called in function "member" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter
const Member = () => {
  // useState, useEffect 這些Hook的東西都不能called conditionally 一定要每個components都一樣都有
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage())
    })
  }, [dispatch])

  if (!currentUser) {
    return <Redirect to="/login" />
  }

  const logOutOnClick = () => {
    dispatch(logout())
  }

  const sideListItems = [
    {
      title: orders,
      url: allPaths[orders],
      onClick: () => null,
    },
    {
      title: profile,
      url: allPaths[profile],
      onClick: () => null,
    },
    {
      title: "優惠券",
      url: "",
      onClick: () => null,
    },
    {
      title: logoutName,
      url: allPaths[home],
      onClick: logOutOnClick,
      topStroke: true,
    },
  ]

  return (
    <Router history={history}>
      <div className="member pages">
        <SideList items={sideListItems} />

        <p>您好, {currentUser.username}</p>
        <p>ID: {currentUser.id}</p>
        <p>名稱: {currentUser.username}</p>
        <p>郵件: {currentUser.email}</p>
        {currentUser.roles && <div>currentUser.roles</div>}
      </div>
    </Router>
  )
}

export default Member
