import React from 'react'
import { Link } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import {
  IoPhonePortrait,
  IoReceipt,
  IoLeaf,
  IoPieChart,
} from 'react-icons/io5'

import 'shared/style/home.scss'
import { FeatureSlot, MonthlySpecial } from 'shared/components/common'
import { allPaths } from 'shared/constants/pathName'
import color from 'shared/style/color'

const gredients = [
  '五花肉塊',
  '梅干菜',
  '辣椒',

  '蔥',
  '大蒜',
  '冰糖',
  '昆布粉',
]

const Home = () => {
  return (
    <div>
      <div className="home pages">
        <section className="banner">
          <div className="title">
            <h1>作伙料理</h1>
            <h1>享受美食第一步</h1>
            <h4>Delicious recipes delivered to your door</h4>
          </div>
        </section>

        <section className="container feature">
          <Row xs="2" lg="4" className="mb-3">
            {/* <div className="arrow col-sm-12">
                  <div className="line"></div>
                  <div className="point"></div>
                </div> */}
            <FeatureSlot content1="適量選購" content2="與能源作伙">
              <IoLeaf color={color.vice} size="3rem" />
            </FeatureSlot>
            <FeatureSlot content1="獨家食譜" content2="與廚食作伙">
              <IoReceipt color={color.vice} size="3rem" />
            </FeatureSlot>
            <FeatureSlot content1="原料透明" content2="與健康作伙">
              <IoPieChart color={color.vice} size="3rem" />
            </FeatureSlot>
            <FeatureSlot content1="料理教學" content2="與科技作伙">
              <IoPhonePortrait color={color.vice} size="3rem" />
            </FeatureSlot>
          </Row>
          <Link
            className="how-to-btn buy__how-to-btn"
            to={allPaths.instruction}
          >
            怎麼買 ?
          </Link>
        </section>

        <section>
          <MonthlySpecial title="梅干扣肉" gredients={gredients} />
        </section>
      </div>
    </div>
  )
}

export default Home
