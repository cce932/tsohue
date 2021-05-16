import React from "react"
import { Router, Link } from "react-router-dom"
import { Carousel, Col, Row } from "react-bootstrap"

import "shared/style/home.scss"
import { history } from "helpers/history"
import { FeatureSlot, MonthlySpecial } from "shared/components/common"
import { allPaths, recipe } from "shared/constants/pathName"

const gredients = ["五花肉塊", "梅干菜", "辣椒", "蔥", "大蒜", "冰糖", "昆布粉"]

const Home = () => {
  return (
    <Router history={history}>
      <div className="home pages">
        <Carousel fade>
          <Carousel.Item className="header-carousel-item bg-cover">
            <img
              className="d-block w-100"
              src="/static-page-pic/home-banner1.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item className="header-carousel-item bg-cover">
            <img
              className="d-block w-100"
              src="/static-page-pic/home-banner2.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
        </Carousel>

        {/* 特色區 */}
        <div className="container feature">
          <Row>
            <Col sm="9">
              <Row>
                {/* <div className="arrow col-sm-12">
                  <div className="line"></div>
                  <div className="point"></div>
                </div> */}
                <FeatureSlot
                  title="源"
                  content1="適量選購"
                  content2="與能源作伙"
                />
                <FeatureSlot
                  title="食"
                  content1="精緻食譜"
                  content2="與廚食作伙"
                />
                <FeatureSlot
                  title="康"
                  content1="原料透明"
                  content2="與健康作伙"
                />
                <FeatureSlot
                  title="學"
                  content1="料理教學"
                  content2="與科技作伙"
                />
              </Row>
            </Col>
            <Col sm="3">
              <div className="how-to-buy">
                <Link to="#">怎麼買 ?</Link>
              </div>
            </Col>
          </Row>
        </div>

        {/* 本月特餐 */}
        <div className={["container", "monthly-special"].join(" ")}>
          {/* <Link to="#"> */}
          <MonthlySpecial title="梅干扣肉" gredients={gredients} />
          {/* </Link> */}
          <div className="how-to-cook">
            <Link to={`${allPaths[recipe]}16`}>怎麼煮 ?</Link>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default Home
