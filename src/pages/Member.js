import React, { useEffect } from 'react'
import { Redirect, Switch, Route, BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from 'actions/auth'
import { clearMessage } from 'actions/message'
import { history } from 'helpers/history'
import 'shared/style/member.scss'
import SideList from 'shared/components/SideList'
import {
  allPaths,
  coupons,
  home,
  logout as logoutName,
  member,
  orderOverview,
  profile,
} from 'shared/constants/pathName'
import OrderOverview from './OrderOverview'
import Profile from './Profile'
import Empty from 'shared/components/Empty'

const Member = () => {
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
      title: orderOverview,
      url: allPaths[orderOverview],
    },
    {
      title: profile,
      url: allPaths[profile],
    },
    {
      title: '優惠券',
      url: allPaths[coupons],
    },
    {
      title: logoutName,
      url: allPaths[home],
      onClick: logOutOnClick,
      topStroke: true,
    },
  ]

  return (
    <BrowserRouter basename={allPaths[member]} history={history}>
      <div className="member container pages">
        <SideList items={sideListItems} />
        <Switch>
          <Route
            exact
            path={allPaths[orderOverview]}
            component={OrderOverview}
          />
          <Route
            exact
            path={allPaths[profile]}
            render={() => <Profile currentUser={currentUser} />}
          />
          <Route
            path={allPaths[coupons]}
            render={() => (
              <div>
                <Empty message="您目前沒有優惠券喔" />
              </div>
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Member
