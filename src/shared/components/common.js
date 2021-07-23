import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { RiInstagramFill, RiFacebookCircleFill } from 'react-icons/ri'

import '../style/common.scss'
import { splitToRows } from '../utility/common'
import { allPaths, recipe } from 'shared/constants/pathName'
import color from 'shared/style/color'

const FeatureSlot = ({ content1, content2, children }) => (
  <Col className="feature-slot">
    <div className="icon">{children}</div>
    <p className="detail">
      {content1}
      <br />
      {content2}
    </p>
  </Col>
)

FeatureSlot.propTypes = {
  content1: PropTypes.string,
  content2: PropTypes.string,
  children: PropTypes.element
}

const MonthlySpecial = ({ title, gredients, gredientsMaxRow = 5 }) => {
  const styled = gredients.map((ingredient, index) => (
    <p key={index}>{ingredient}</p>
  ))
  const splited = splitToRows(styled, gredientsMaxRow).map(
    (gredients, index) => (
      <div className="splited-row" key={index}>
        {gredients}
      </div>
    )
  )

  return (
    <section className="container monthly-special">
      <Row xs="1" lg="2">
        <Col lg="8">
          <img
            className="w-100"
            src="/static-page-pic/home-monthlySpecial.jpg"
            alt="Monthly special"
          />
        </Col>
        <Col lg="4">
          <Row md="2" xs="1" lg="1" className="intro mx-auto">
            <Col md="5">
              <span>本月特餐</span>
              <h1 className="title">{title}</h1>
              <div className="ingredients">{splited}</div>
            </Col>
            <Col md="7" className="center">
              <Link className="how-to-btn" to={`${allPaths[recipe]}16`}>
                怎麼煮 ?
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  )
}

MonthlySpecial.propTypes = {
  title: PropTypes.string.isRequired,
  gredients: PropTypes.array.isRequired,
  gredientsMaxRow: PropTypes.number
}

const Footer = ({ links, linksMaxRow = 5 }) => {
  const styled = links.map((link, index) => (
    <a href={link.href} key={index}>
      {link.title}
    </a>
  ))
  const splited = splitToRows(styled, linksMaxRow).map((links, index) => (
    <div className="splited-row" key={index}>
      {links}
    </div>
  ))

  return (
    <div className="container-bg footer-container-bg">
      <div className="footer container" id="footer">
        <Row xs="1" sm="2">
          <Col lg="8" md="7" className="left">
            <label className="title">TsoHue / 作伙</label>
            <div className="links">{splited}</div>
          </Col>
          <Col lg="4" md="5" className="right">
            <div className="media-icons">
              <a href="https://www.facebook.com/tsohuecook/">
                <RiInstagramFill color={color.prime} size="26" />
              </a>
              <a href="https://www.instagram.com/tsohue_cook/">
                <RiFacebookCircleFill color={color.prime} size="26" />
              </a>
            </div>

            <p>02-4566-7000</p>
            <p>SUN - FRI 08:00 - 20:00</p>
            <p>作伙股份有限公司</p>
            <p>tso.hue@tsohue.com</p>
            <p>230 台北市大安區基隆路526號</p>
          </Col>
        </Row>
      </div>
    </div>
  )
}

Footer.propTypes = {
  links: PropTypes.array.isRequired,
  linksMaxRow: PropTypes.number
}

export { FeatureSlot, MonthlySpecial, Footer }
