import React from "react"
import home from "../shared/style/home.scss"
import { Router, Link } from "react-router-dom"
import { history } from '../helpers/history'
import FeatureSlot from "../shared/components/FeatureSlot";

const Home = () => {
  return (
    <Router history={history}>
      <div>
        <div>
          <img className="banner" src="/home-pic/banner1.png"></img>
        </div>

        <div className="container">

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
      </div>
    </Router>
  )
}

export default Home