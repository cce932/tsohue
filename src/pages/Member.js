import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import 'shared/style/member.scss'
import { logout } from 'actions/auth'
import SideList from 'shared/components/SideList'
import {
  allPaths,
  coupons,
  logout as logoutName,
  orderOverview,
  profile,
} from 'shared/constants/pathName'

const Member = () => {
  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!currentUser) {
    return <Navigate to="/login" />
  }

  const logOutOnClick = () => {
    dispatch(logout())
    navigate('/')
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
      onClick: logOutOnClick,
      topStroke: true,
    },
  ]

  return (
    <div className="member container pages">
      <Row sm="1" lg="2">
        <Col lg="2">
          <SideList items={sideListItems} />
        </Col>
        <Col lg="10">
          <Outlet />
        </Col>
      </Row>
    </div>
  )
}

export default Member
