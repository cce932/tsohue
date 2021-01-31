import React from 'react'
import '../style/common.scss'
import { splitToRows } from '../utility/common'

export const FeatureSlot = ({
    title,
    content1,
    content2
}) =>
    <div className={`col feature-slot`}>
        <div className="sc"><p>{title}</p></div>
        <p>{content1}<br />
            {content2}</p>
    </div>



export const MonthlySpecial = ({
    title,
    gredients,
    gredientsMaxRow = 5
}) => {
    const styled = gredients.map((gredient, index) => <p key={index}>{gredient}</p>)
    const splited = splitToRows(styled, gredientsMaxRow)
        .map((gredients, index) => 
            <div className="g-row" key={index}>{gredients}</div>
    )

    return (
        <div className="monthly-special">
            <img src="/home-pic/monthlySpecial.jpg" alt="Monthly special" />

            <div className="special">
                <label>本月特餐</label>
                <p className="title">{title}</p>
                <img src="/common-pic/wave.svg" alt="Decorating wave" />
                <div className="gredients">
                    {splited}
                </div>
            </div>
        </div>
    )
}

export const Footer = ({
    links,
    linksMaxRow = 5
}) => {
    const styled = links.map((link, index) => <p key={index}>{link}</p>)
    const splited = splitToRows(styled, linksMaxRow)
        .map((links, index) => 
            <div className="g-row" key={index}>{links}</div>
    )

    return (
      <div className="container-bg">
        <div className={`footer container`}>
          <div className="row">
            <div className={`col col-9 left`}>
              <label>TsoHue / Right amount for you</label>
              <div className="links">{splited}</div>
            </div>
            <div className={`col col-3 right`}>
              <div className="media-icons">
                <button>
                  <img src="/common-pic/fb.svg" alt="Facebook" />
                </button>
                <button>
                  <img src="/common-pic/ig.svg" alt="Instagram" />
                </button>
              </div>

              <p>02-4566-7000</p>
              <p>SUN - FRI 08:00 - 20:00</p>
              <p>作伙股份有限公司</p>
              <p>tso.hue@tsohue.com</p>
              <p>230 台北市大安區基隆路526號</p>
            </div>
          </div>
        </div>
      </div>
    )    
}
