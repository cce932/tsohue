import React from 'react'
import PropTypes from 'prop-types'

import color from 'shared/style/color'
import { StyledP } from 'shared/components/styled'
import { roleOptions } from 'shared/constants/options'
import { Col, Row } from 'react-bootstrap'

const Item = ({ type, info }) => (
  <Col className="block">
    <StyledP lineHeight="2" fontSize="1.2rem" color={color.prime}>
      {type}
    </StyledP>
    <StyledP fontSize="0.9rem" color={color.prime}>
      {info}
    </StyledP>
  </Col>
)

Item.propTypes = {
  type: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
}

const Profile = ({ account, email, role, phone, username }) => {
  const content = [
    { type: '帳號', info: account },
    { type: '郵件', info: email },
    { type: '身份', info: roleOptions[role] },
    { type: '電話', info: phone },
  ]

  return (
    <div className="profile container">
      <StyledP
        margin="0 0 50px"
        fontSize="1.5rem"
        weight="bold"
        color={color.prime}
      >
        你好，{username}
      </StyledP>

      <Row>
        {content.map((item) => (
          <Item key={item.type} {...{ ...item }} />
        ))}
      </Row>
    </div>
  )
}

Profile.propTypes = {
  account: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
}

export default Profile
