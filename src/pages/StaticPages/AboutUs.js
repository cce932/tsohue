import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap'
import { IoMdCheckmark } from 'react-icons/io'

import { StrokeSpan, StyledP } from 'shared/components/styled'
import color from 'shared/style/color'

const intention = [
  '自2020年新冠肺炎爆發後，民眾大幅減少不必要之外出活動，導致很多實體業者因此受創。俗話說：「危機就是轉機」，對於宅經濟而言，疫情反而成為一大助力，其中飲食外送也成為了一大潮流。然而，在健康意識抬頭的今日，還是有些群眾會顧慮外送的餐點是否營養均衡。此外，外送常因時間距離等因素導致民眾的選擇有限，因此他們大多都偏好自行下廚。但在疫情的影響下，前往人潮眾多的超市與的傳統市場反而會大幅增加民眾群聚感染的風險。',
  '此外，有時為了製作一道料理，常常因商家包裝而購買過多的食材。例如為了做一道人蔘雞湯而買了一整包的人蔘，但單人或小家庭一次的用量不多。若一次烹調大量的食物，之後重複加熱，就容易導致食材營養流失。而多餘的食材也可能因久置而過期。此時，若有一款人蔘雞湯的烹飪包，內容是新鮮食材與調味料且分量經過客制，讓消費者不會買到過多的食材外，也可確保料理的調味比例及新鮮度。',
]

const Wrapper = styled.div`
  padding: 0 250px;
  width: 100%;
`

const FullWidthBtn = styled.button`
  width: 100%;
`

const RoundedImg = styled.img`
  border-radius: ${(props) => props.borderRadius || '0'};
  margin-bottom: 50px;
  width: 100%;
  object-fit: cover;
`

const Feature = ({ title, description }) => (
  <div>
    <StyledP fontSize="1.1rem" weight="bold" color={color.prime} margin="5px 0">
      <IoMdCheckmark fill={color.vage} size="22px" /> {title}
    </StyledP>
    <StyledP
      fontSize="1rem"
      color={color.prime}
      margin="0 0 15px"
      lineHeight="2"
    >
      {description}
    </StyledP>
  </div>
)

Feature.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

const webFeatureContent = [
  {
    title: '多版本烹飪包',
    description:
      '讓使用者能購買食譜上的食材或進行份量客製，以解決食材浪費的問題。',
  },
  {
    title: '食物不浪費',
    description:
      '購買食譜時，有不同版本可供選擇（低脂版、多肉版），方便消費者作熱量與營養的控管。',
  },
]

const appFeatureContent = [
  {
    title: 'APP聲控教學',
    description: '搭配行動裝置APP，讓使用者可以邊聲控操作影片邊做菜。',
  },
]

const AboutUs = () => {
  const joinVIpOnClick = () => window.alert('此功能尚在策劃中，感謝您的支持')

  return (
    <div className="vip-detail">
      <FullWidthBtn onClick={joinVIpOnClick}>
        <RoundedImg
          src="static-page-pic/about-us-banner.jpg"
          alt="vip-banner"
        />
      </FullWidthBtn>
      <Wrapper>
        <StrokeSpan
          size="1.5rem"
          padding="5px 15px"
          color={color.prime}
          margin="0"
          lineHeight="4"
        >
          初心
        </StrokeSpan>

        <StyledP
          fontSize="1rem"
          lineHeight="2"
          color={color.prime}
          margin="0 0 50px"
        >
          {intention.map((line) => (
            <>
              {line}
              <br />
            </>
          ))}
        </StyledP>

        <StrokeSpan
          size="1.5rem"
          padding="5px 15px"
          color={color.prime}
          margin="0"
          lineHeight="4"
        >
          特色
        </StrokeSpan>

        <Row>
          <Col sm="5">
            {webFeatureContent.map((item) => (
              <Feature key={item.title} {...{ ...item }} />
            ))}
          </Col>
          <Col sm="7">
            <RoundedImg
              borderRadius="10px"
              src="/static-page-pic/about-us-web.jpg"
              alt="web-intro"
            />
          </Col>
        </Row>
        <Row>
          <Col sm="5">
            {appFeatureContent.map((item) => (
              <Feature key={item.title} {...{ ...item }} />
            ))}
          </Col>
          <Col sm="7">
            <RoundedImg
              borderRadius="10px"
              src="/static-page-pic/about-us-app.jpg"
              alt="app-intro"
            />
          </Col>
        </Row>
      </Wrapper>
    </div>
  )
}

export default AboutUs
