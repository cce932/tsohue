import React from "react"

import color from "shared/style/color"
import { StyledP } from "shared/components/styled"
import { roleOptions } from "shared/constants/options"
import { Col, Row } from "react-bootstrap"

const Item = ({ type, info }) => (
  <Col className="block">
    <StyledP lineHeight="2" fontSize="1.2rem" color={color.prime}>
      {type}
    </StyledP>
    <StyledP fontSize="1rem" color={color.secondary}>
      {info}
    </StyledP>
  </Col>
)

const Profile = ({ currentUser }) => {
  const content = [
    { type: "帳號", info: currentUser.account },
    { type: "郵件", info: currentUser.email },
    { type: "身份", info: roleOptions[currentUser.role] },
    { type: "電話", info: currentUser.phone },
  ]

  return (
    <div className="profile container">
      <StyledP
        margin="0 0 50px"
        fontSize="1.5rem"
        weight="bold"
        color={color.prime}
      >
        你好，{currentUser.username}
      </StyledP>

      <Row>
        {content.map((item) => (
          <Item {...{ ...item }} />
        ))}
      </Row>
    </div>
  )
}

export default Profile
