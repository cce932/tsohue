import React from "react"

import "shared/style/vip.scss"
import { StrokeSpan, StyledFont } from "shared/components/styled"
import color from "shared/style/color"

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
        <div className="block">
          <StyledFont fontSize="2rem" color={color.accentDeeper}>
            1
          </StyledFont>
          <div>
            <StyledFont fontSize="1.3rem" weight="bold" color={color.prime}>
              客製化調整食譜內容
            </StyledFont>
            <StyledFont fontSize="0.9rem" color={color.prime}>
              簡潔便利的選購介面，打造屬於你自己的調味
            </StyledFont>
          </div>
        </div>
        <div className="block">
          <StyledFont fontSize="2rem" color={color.accentDeeper}>
            2
          </StyledFont>
          <div>
            <StyledFont fontSize="1.3rem" weight="bold" color={color.prime}>
              VIP專屬優惠
            </StyledFont>
            <StyledFont fontSize="0.9rem" color={color.prime}>
              網站將不定時推出季節特賣、滿額免運等優惠
            </StyledFont>
          </div>
        </div>
        <div className="block">
          <StyledFont fontSize="2rem" color={color.accentDeeper}>
            3
          </StyledFont>
          <div>
            <StyledFont fontSize="1.3rem" weight="bold" color={color.prime}>
              當月主打套餐保留名額
            </StyledFont>
            <StyledFont fontSize="0.9rem" color={color.prime}>
              VIP專屬預約制度，搶先通知，輕鬆付款，再也不用半夜刷F5搶購
            </StyledFont>
          </div>
        </div>
        <div className="block">
          <StyledFont fontSize="2rem" color={color.accentDeeper}>
            4
          </StyledFont>
          <div>
            <StyledFont fontSize="1.3rem" weight="bold" color={color.prime}>
              零廣告干擾
            </StyledFont>
            <StyledFont fontSize="0.9rem" color={color.prime}>
              移除網站所有廣告，專心挑選不被干擾。
            </StyledFont>
          </div>
        </div>
        <div className="block">
          <StyledFont fontSize="2rem" color={color.accentDeeper}>
            5
          </StyledFont>
          <div>
            <StyledFont fontSize="1.3rem" weight="bold" color={color.prime}>
              最新功能搶先體驗
            </StyledFont>
            <StyledFont fontSize="0.9rem" color={color.prime}>
              成為作伙的前排觀賞者，一齊見證新的開始。
            </StyledFont>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vip
