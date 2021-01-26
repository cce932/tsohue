import React from "react"
import { Router, Link } from "react-router-dom"
import home from "shared/style/home.scss"
import { history } from 'helpers/history'
import { FeatureSlot, MonthlySpecial, Footer } from "shared/components/common";

const gredients = ["東坡肉", "梅干", "滷蛋", "青江菜", "洋蔥", "紅蔥頭", "鹽", "特調醬料"]
const footerLinks = ["關於我們", "常見問答", "售後服務", "會員權益", "隱私保護", "門市位置", "企業徵才", "異業合作"]

const Home = () => {
  return (
    <Router history={history}>
      <div>

        {/* 主banner */}
        <div className="main-banner">
          <div className="slogan">
            <label>作伙料理小師傅</label><br />
            <label> 享受美食第一步</label>
            <p>TsoHue / Right amount for you</p>
          </div>
          <img className="banner" src="/home-pic/banner1.jpg"></img>
        </div>

        {/* 特色區 */}
        <div className={["container", "feature"].join(" ")}>
          <div className='row'>
            <div className="col col-8">
              <div className='row'>
                <div className="arrow">
                  <div className="line"></div>
                  <div className="point"></div>
                </div>
                <FeatureSlot title="源" content1="適量選購" content2="與能源作伙" />
                <FeatureSlot title="食" content1="精緻食譜" content2="與廚食作伙" />
                <FeatureSlot title="康" content1="原料透明" content2="與健康作伙" />
                <FeatureSlot title="學" content1="料理教學" content2="與科技作伙" />
              </div>
            </div>

            <div className="col col-4">
              <Link to="#">
                怎麼買？
              </Link>
            </div>
          </div>
        </div>

        {/* 本月特餐 */}
        <div className={["container", "monthly-special"].join(" ")}>
          {/* <Link to="#"> */}
          <MonthlySpecial title="梅香東坡肉拌飯" gredients={gredients} />
          {/* </Link> */}
          <div class="how-cook">
            <Link to="#">
              怎麼煮？
            </Link>
          </div>
        </div>
      </div>

      {/* 頁尾 */}
      <Footer links={footerLinks} />
    </Router>
  )
}

export default Home