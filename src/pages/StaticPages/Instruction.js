import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import 'shared/style/vip.scss'
import { StrokeSpan, StyledP } from 'shared/components/styled'
import color from 'shared/style/color'

const VideoWrapperDiv = styled.div`
  background: linear-gradient(
    170deg,
    ${(props) => props.theme.viceLighterColor},
    ${(props) => props.theme.fifthColor}
  );
  text-align: center;
  padding: 122px 20% 40px;

  @media screen and (max-width: 768px) {
    & {
      padding: 80px 8% 20px;
    }
  }

  @media screen and (max-width: 576px) {
    & {
      padding: 80px 0 20px;
    }
  }
`

// the responsive formula is from w3schools
const ResponsiveIframe = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 56.25%; /* 16:9*/

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;  
    width: 100%;
    height: 100%;
  }
`

const WrapperDiv = styled.div`
  margin: 30px 10%;
`

const ItemWrapperDiv = styled.div`
  width: 100%;
  display: flex;
  flex: 0 1 auto;
  flex-wrap: wrap;
`

const StyledDiv = styled.div`
  margin: 15px 30px;
  > * {
    margin-bottom: 10px;
  }
`

const StyledImg = styled.img`
  max-width: ${(props) => props.isLandscape ? '239px' : '200px'}; // in order to fit iPad pro
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.fifthColor};
`

// const webContent = [
//   {
//     title: '進入烹飪包大全',
//     description: '',
//     img: 'https://easycook-backend.s3.amazonaws.com/web-static-image/1-all-recipe.jpg',
//   },
//   {
//     title: '點選欲購買的食譜',
//     description: '',
//     img: 'https://easycook-backend.s3.amazonaws.com/web-static-image/2-recipe-detail.jpg',
//   },
//   {
//     title: '加入購物車',
//     description: '',
//     img: 'https://easycook-backend.s3.amazonaws.com/web-static-image/3-shopping-cart.jpg',
//   },
//   {
//     title: '點選訂購',
//     description: '',
//     img: 'https://easycook-backend.s3.amazonaws.com/web-static-image/4-order-confirm.jpg',
//   },
//   {
//     title: '下訂單，訂購成功',
//     description: '',
//     img: 'https://easycook-backend.s3.amazonaws.com/web-static-image/5-order-check.jpg',
//   },
//   {
//     title: '查看訂單',
//     description: '訂單狀態於「待確認」時，皆可取消訂單',
//     img: 'https://easycook-backend.s3.amazonaws.com/web-static-image/6-order-detail.jpg',
//   },
// ]

const appContent = [
  {
    title: '進入主頁',
    description: '',
    img: 'https://easycook-backend.s3.amazonaws.com/web-static-image/index.jpg',
  },
  {
    title: '訂單總覽',
    description: '',
    img: 'https://easycook-backend.s3.amazonaws.com/web-static-image/order.jpg',
  },
  {
    title: '點擊欲導覽的食譜',
    description: '',
    img: 'https://easycook-backend.s3.amazonaws.com/web-static-image/orderDetail.jpg',
  },
  {
    title: '食譜影片分頁',
    // description: '也可以直接由「食譜總覽」進入本頁面喔',
    img: 'https://easycook-backend.s3.amazonaws.com/web-static-image/recipeDetail.jpg',
  },
  {
    title: '進行影片教學',
    description: '',
    img: 'https://easycook-backend.s3.amazonaws.com/web-static-image/recipeVideo.jpg',
  },
  {
    title: '開始聲控料理導覽～',
    description: '',
    img: 'https://easycook-backend.s3.amazonaws.com/web-static-image/instruction.jpg',
    isLandscape: true,
  },
]

const Item = ({ title, description, img, isApp, isLandscape, index }) => (
  <StyledDiv>
    <StyledP
      fontSize="1.3rem"
      weight="bold"
      color={color.prime}
    >
      {`${index + 1} ${title}`}
    </StyledP>
    {/* {description && (
      <StyledP fontSize="0.9rem" color={color.prime}>
        {description}
      </StyledP>
    )} */}
    <StyledImg
      src={img}
      isLandscape={isLandscape}
    />
  </StyledDiv>
)

Item.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  isApp: PropTypes.bool.isRequired,
  isLandscape: PropTypes.bool,
  index: PropTypes.number.isRequired,
}

const Instruction = () => {
  return (
    <div className="instruction">
      <VideoWrapperDiv>
        <ResponsiveIframe>
          <iframe
            src="https://easycook-backend.s3.amazonaws.com/order-instruction-1.mp4"
            scrolling="no"
            frameBorder="0"
            // width="700"
            // height="394"
            allowFullScreen="true"
            webkitAllowFullScreen="true"
            mozAllowFullScreen="true"
            title="order-instruction"
          />
        </ResponsiveIframe>
      </VideoWrapperDiv>
      <WrapperDiv>
        {/* <StrokeSpan
          size="1.5rem"
          padding="5px 15px"
          color={color.prime}
          margin="0"
          lineHeight="3"
        >
          Web訂購指南
        </StrokeSpan>
        <ItemWrapperDiv>
          {webContent.map((item, index) => (
            <Item key={item.title} {...{ ...item, isApp: false, index }} />
          ))}
        </ItemWrapperDiv> */}
        <StrokeSpan
          size="1.5rem"
          padding="5px 15px"
          color={color.prime}
          margin="0"
          lineHeight="3"
        >
          APP聲控導覽
        </StrokeSpan>
        <ItemWrapperDiv>
          {appContent.map((item, index) => (
            <Item key={item.title} {...{ ...item, isApp: true, index }} />
          ))}
        </ItemWrapperDiv>
      </WrapperDiv>
    </div>
  )
}

export default Instruction
