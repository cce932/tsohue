import React from "react"
import home from "../shared/style/home.scss"
import { Router, Link } from "react-router-dom"
import { history } from '../helpers/history'

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

                <div className="col feature">
                  <div className="sc"><p>源</p></div>
                  <p>適量選購<br />
                                與能源作伙</p>
                </div>
                <div className="col feature">
                  <div className="sc rotate"><p>食</p></div>
                  <p>精緻食譜<br />
                                與廚師作伙</p>
                </div>
                <div className="col feature">
                  <div className="sc"><p>康</p></div>
                  <p>原料透明<br />
                                與健康作伙</p>
                </div>
                <div className="col feature">
                  <div className="sc rotate"><p>學</p></div>
                  <p>料理教學<br />
                                與科技作伙</p>
                </div>

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