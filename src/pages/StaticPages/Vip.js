import React from "react"

import "shared/style/vip.scss"
import { StrokeSpan, StyledP } from "shared/components/styled"
import color from "shared/style/color"

const content = [
  {
    type: "客製化調整食譜內容",
    info: "簡潔便利的選購介面，打造屬於你自己的調味",
  },
  { type: "VIP專屬優惠", info: "網站將不定時推出季節特賣、滿額免運等優惠" },
  {
    type: "當月主打套餐保留名額",
    info: "VIP專屬預約制度，搶先通知，輕鬆付款，再也不用半夜刷F5搶購",
  },
  { type: "零廣告干擾", info: "移除網站所有廣告，專心挑選不被干擾。" },
  {
    type: "最新功能搶先體驗",
    info: "成為作伙的前排觀賞者，一齊見證新的開始。",
  },
]

const Item = ({ type, info, index }) => (
  <div className="block">
    <StyledP fontSize="2rem" color={color.accentDeeper}>
      {index + 1}
    </StyledP>
    <div>
      <StyledP fontSize="1.3rem" weight="bold" color={color.prime}>
        {type}
      </StyledP>
      <StyledP fontSize="0.9rem" color={color.prime}>
        {info}
      </StyledP>
    </div>
  </div>
)

const Vip = () => {
  const joinVIpOnClick = () => window.alert("此功能尚在策劃中，感謝您的支持")

  return (
    <div className="vip">
      <button onClick={joinVIpOnClick}>
        <img src="static-page-pic/vip-banner.jpg" alt="vip-banner" />
      </button>
      <div className="container">
        <StrokeSpan
          size="1.5rem"
          padding="5px 15px"
          color={color.prime}
          margin="0"
          lineHeight="3"
        >
          會員福利
        </StrokeSpan>
        {content.map((item, index) => (
          <Item {...{ ...item, index }} />
        ))}
      </div>
    </div>
  )
}

export default Vip
