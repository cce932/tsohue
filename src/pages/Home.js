import React from "react"
import { Router, Link } from "react-router-dom"
import { Carousel } from "react-bootstrap"

import "shared/style/home.scss"
import { history } from "helpers/history"
import { FeatureSlot, MonthlySpecial } from "shared/components/common"
import { allPaths, recipe } from "shared/constants/pathName"

const gredients = [
  "東坡肉",
  "梅干",
  "滷蛋",
  "青江菜",
  "洋蔥",
  "紅蔥頭",
  "鹽",
  "特調醬料",
]

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
        <div className={`container feature`}>
          <div className="row">
            <div className="col col-1"></div>
            <div className="col col-8">
              <div className="row">
                <div className="arrow">
                  <div className="line"></div>
                  <div className="point"></div>
                </div>
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
              </div>
            </div>

            <div className="col col-3">
              <Link to="#">怎麼買 ?</Link>
            </div>
          </div>
        </div>

        {/* 本月特餐 */}
        <div className={["container", "monthly-special"].join(" ")}>
          {/* <Link to="#"> */}
          <MonthlySpecial title="梅香東坡肉拌飯" gredients={gredients} />
          {/* </Link> */}
          <div className="how-cook">
            <Link to={`${allPaths[recipe]}1`}>怎麼煮 ?</Link>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default Home
