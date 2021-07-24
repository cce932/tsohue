import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import 'shared/style/vip.scss'
import { StrokeSpan, StyledP } from 'shared/components/styled'
import color from 'shared/style/color'

const content = [
  {
    question: '價格如何計算？',
    answer: [
      '目前的計價方式採用以下兩種方式來進行:',
      '1. 預設食材數量的烹飪包',
      '預設數量的烹飪包是根據食材成本進行定價。',
      '2. VIP會員的客製化烹飪包',
      '若您是VIP會員，便可以開啟VIP專區的客製化烹飪包功能，該功能所採買的烹飪包，',
      '價格是人工與包裝成本 + VIP 會員所採買食材數量 * 該食材當下的價格，所進行運算。',
    ],
  },
  {
    question: '食材的物價會變動嗎？',
    answer: [
      '作伙電商所採買的食材皆有品質保證，在未來使用者可以於烹飪包詳細頁面看見該食材的詳細資訊，包括熱量、產地、有效期限、合作商。',
    ],
  },
]

const Item = ({ question, answer }) => (
  <div>
    <StyledP
      fontSize="1.2rem"
      weight="bold"
      margin="0 0 10px"
      color={color.prime}
    >
      Q: {question}
    </StyledP>
    <StyledP
      fontSize="1rem"
      color={color.prime}
      margin="0 0 30px"
      lineHeight="2"
    >
      {answer.map((t, index) => (
        <span key={index}>
          {t}
          {index < answer.length - 1 && <br />}
        </span>
      ))}
    </StyledP>
  </div>
)

Item.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.array.isRequired,
}

const WrapperDiv = styled.div`
  margin-bottom: 50px;
  margin-top: 100px !important;
`

const QA = () => {
  return (
    <WrapperDiv className="qa pages container">
      <StrokeSpan
        size="1.5rem"
        padding="5px 15px"
        color={color.prime}
        margin="0"
        lineHeight="4"
      >
        常見問答
      </StrokeSpan>
      {content.map((item, index) => (
        <Item key={index} {...{ ...item }} />
      ))}
    </WrapperDiv>
  )
}

export default QA
