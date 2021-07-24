import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import 'shared/style/vip.scss'
import { StrokeSpan, StyledP } from 'shared/components/styled'
import color from 'shared/style/color'

const content =
  {
    title: '網站使用規則',
    description: [
      '使用者承諾絕不為任何非法目的或以任何非法方式使用本網站，並承諾遵守中華民國相關法規及一切使用網際網路之國際慣例。使用者同意並保證不得利用本服務從事侵害他人權益或違法之行為，您在使用作伙買菜網之網站行為均受本條款之規範，必須遵循以下原則:',
      '(1)遵守中華民國有關的法律和法規;或任何國際、國家、省或州立規定、規則、法律或地方條例',
      '(2)不得為任何非法目的而使用;或不得徵求他人來執行或參與任何非法行為',
      '(3)不得利用作伙買菜網網站服務系統進行任何不利於作伙買菜網的行為;干擾、上傳或傳輸病毒或任何其他類型的惡意軟體程式碼，以致於影響到本服務、任何相關網站、其他網站或網路的安全功能或運行',
      '(4)不得侵害或毀損作伙買菜網或他人名譽、隱私權、營業秘密、商標權、著作權、專利權、其他智慧財產權及其他權利',
      '(5)違反依法律或契約所應負之保密義務',
      '(6)不得公布或傳送任何誹謗、侮辱、具威脅性、攻擊性、不雅、猥褻、不實、違反公共秩序或善良風俗或其他不法之文字、圖片或任何形式的檔案',
      '(7)不得從事未經作伙買菜網事前授權的商業行為;或未經作伙買菜網同意而在任何通路銷售本公司提供之折價金。',
      '(8)提交虛假或誤導性的資訊;或收集或追蹤其他人的個人資訊',
      '(9)其他不符本服務所提供的使用目的之行為或作伙買菜網有正當理由認為不適當之行為',
      '(10)如發現任何非法使用作伙買菜網網站之情況，應立即通知作伙買菜網。違反或不遵守任何服務條款將會導致本服務的立即終止，且不另行通知;作伙買菜網有權自行決定是否因為任何理由隨時拒絕提供服務給任何人。',
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
    <StyledP
      fontSize="1rem"
      color={color.prime}
      margin="0 0 30px"
      lineHeight="2.2"
    >
      {description.map((line, index) => (
        <span key={index}>
          {line}
          {index < description.length - 1 && <br />}
        </span>
      ))}
    </StyledP>
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

const Policy = () => {
  return (
    <WrapperDiv className="qa pages container">
      <StrokeSpan
        size="1.5rem"
        padding="5px 15px"
        color={color.prime}
        margin="0"
        lineHeight="4"
      >
        作伙條款
      </StrokeSpan>
      <Item {...{ ...content }} />
    </WrapperDiv>
  )
}

export default Policy
