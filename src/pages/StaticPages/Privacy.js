import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import 'shared/style/vip.scss'
import { StrokeSpan, StyledP } from 'shared/components/styled'
import color from 'shared/style/color'

const content =
  {
    title: '隱私權條款',
    description: [
      '作伙電商股份有限公司（以下稱「本公司」）向您蒐集個人資料，茲依據個人資料保護法（以下稱「個資法」）第八條第一項規定，向您告知下列事項：',
      '一、蒐集資料之機關名稱:作伙電商股份有限公司。',
      '二、蒐集之目的:商品銷售、廣告行銷、履行契約義務、客戶管理、客戶服務、統計調查與分析，以及其他合於本公司營業登記項目之目的。',
      '三、蒐集之個人資料類別:辨識個人者，包括姓名、性別、身分證統一編號、出生年月日、聯絡電話、聯絡地址、電子郵件信箱等。',
      '四、個人資料利用之期間、地區、對象及方式:',
      [
        '（一）期間:您加入成為「作伙電商網站」會員，擁有會員身份之期間。',
        '（二）地區:台灣地區。',
        '（三）對象:本公司內部使用，以及金融交易授權、物流配送、市調公司等之受託單位。',
        '（四）方式:以書面或電磁記錄方式儲存、建檔。',
      ],
      '五、依據個資法第三條規定，您就本公司蒐集之您的個人資料，得行使下列權利:',
      [
        '（一）得向本公司查詢、請求閱覽或請求製給複製本。',
        '（二）得向本公司請求補充或更正。',
        '（三）得向本公司請求停止蒐集、處理或利用，或請求刪除。',
      ],
      '六、您若未能提供個人資料，本公司將無法提供您網路購物之完整服務。',
      '七、本公司隱私權保護政策放置於「作伙電商」網站，您可隨時參閱。',
    ],
  }

const Item = ({ title, description }) => (
  <div>
    <StyledP
      fontSize="1.2rem"
      weight="bold"
      margin="0 0 10px"
      color={color.prime}
    >
      {title}
    </StyledP>

    {description.map((line, index) => ( // TODO: can do a recursive enhance
      typeof line !== 'object'
        ? <StyledP key={index} fontSize="1rem" color={color.prime} lineHeight="2">
            {line}
          </StyledP>
        : line.map((point, index) => (
            <StyledP
            key={index}
              fontSize="1rem"
              color={color.prime}
              margin="0 30px"
              lineHeight="2"
            >
              {point}
            </StyledP>
        ))
    ))}
  </div>
)

Item.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.array.isRequired,
}

const WrapperDiv = styled.div`
  margin-bottom: 50px;
  margin-top: 100px !important;
`

const Privacy = () => {
  return (
    <WrapperDiv className="qa pages container">
      <StrokeSpan
        size="1.5rem"
        padding="5px 15px"
        color={color.prime}
        margin="0"
        lineHeight="4"
      >
        隱私保護
      </StrokeSpan>
      <Item {...{ ...content }} />
    </WrapperDiv>
  )
}

export default Privacy
