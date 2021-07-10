import React from "react"
import { Col } from "react-bootstrap"
import { AiFillInstagram } from "react-icons/ai"
import { GrFacebookOption, GrInstagram } from "react-icons/gr"

import "../style/common.scss"
import { splitToRows } from "../utility/common"
import color from "shared/style/color"

export const FeatureSlot = ({ title, content1, content2 }) => (
  <Col className="feature-slot">
    <div className="sc">
      <p>{title}</p>
    </div>
    <p>
      {content1}
      <br />
      {content2}
    </p>
  </Col>
)

export const MonthlySpecial = ({ title, gredients, gredientsMaxRow = 5 }) => {
  const styled = gredients.map((ingredient, index) => (
    <p key={index}>{ingredient}</p>
  ))
  const splited = splitToRows(styled, gredientsMaxRow).map(
    (gredients, index) => (
      <div className="g-row" key={index}>
        {gredients}
      </div>
    )
  )

  return (
    <div className="monthly-special">
      <img
        src="/static-page-pic/home-monthlySpecial.jpg"
        alt="Monthly special"
      />

      <div className="special">
        <label>本月特餐</label>
        <p className="title">{title}</p>
        {/* <img src="/common-pic/wave.svg" alt="Decorating wave" /> */}
        <div className="gredients">{splited}</div>
      </div>
    </div>
  )
}

export const Footer = ({ links, linksMaxRow = 5 }) => {
  const styled = links.map((link, index) => (
    <a href={link.href} key={index}>
      {link.title}
    </a>
  ))
  const splited = splitToRows(styled, linksMaxRow).map((links, index) => (
    <div className="g-row" key={index}>
      {links}
    </div>
  ))

  return (
    <div className="container-bg footer-container-bg">
      <div className="footer container" id="footer">
        <div className="left">
          <label className="title">JUST DIET / 一起戒DIET吧</label>
          <div className="links">{splited}</div>
        </div>
        <div className="right">
          <div className="media-icons">
            <a href="https://www.facebook.com/tsohuecook/">
              <GrFacebookOption size="24px" fill={color.prime} />
            </a>
            <a href="https://www.instagram.com/tsohue_cook/">
              <GrInstagram size="23px" fill={color.prime} />
            </a>
          </div>

          <p>02-4566-7000</p>
          <p>SUN - FRI 08:00 - 20:00</p>
          <p>戒大股份有限公司</p>
          <p>just.diet@diet.com</p>
          <p>230 台北市大安區基隆路526號</p>
        </div>
      </div>
    </div>
  )
}
