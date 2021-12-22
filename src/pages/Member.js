import React from 'react'
import { Redirect, Switch, Route, BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import 'shared/style/member.scss'
import { logout } from 'actions/auth'
import SideList from 'shared/components/SideList'
import OrderOverview from './OrderOverview'
import Profile from './Profile'
import Empty from 'shared/components/Empty'
import {
  allPaths,
  coupons,
  home,
  logout as logoutName,
  member,
  orderOverview,
  profile,
} from 'shared/constants/pathName'

const Member = () => {
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
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
    <BrowserRouter basename={allPaths[member]}>
      <div className="member container pages">
        <Row sm="1" lg="2">
          <Col lg="2">
            <SideList items={sideListItems} />
          </Col>
          <Col lg="10">
            <Switch>
              <Route
                exact
                path={allPaths[orderOverview]}
                component={OrderOverview}
              />
              <Route
                exact
                path={allPaths[profile]}
                render={() => <Profile {...{ ...currentUser }} />}
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
          </Col>
        </Row>
      </div>
    </BrowserRouter>
  )
}

export default Member
