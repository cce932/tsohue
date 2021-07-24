import React from 'react'

import { SolidA } from 'shared/components/styled'
import color from 'shared/style/color'
import styled from 'styled-components'

const StyledDiv = styled.div`
  text-align: center;
  color: ${(props) => props.theme.primeColor};
  font-size: 1rem;

  img {
    width: 150px;
    opacity: 0.7;
  }

  p {
    ${(props) => props.theme.font}
    font-size: 1.5rem;
    padding-bottom: 20px;
  }

  > div {
    padding: 20px;

    &.order-number {
      ${(props) => props.theme.font}
      color: ${(props) => props.theme.thirdColor};
    }
  }
`

const OrderSuccess = (props) => {
  const id = new URL(window.location.href).searchParams.get('id')
  const number = new URL(window.location.href).searchParams.get('number')

  const strokeStyle = {
    margin: '10px',
    border: `${color.prime} solid 1px`,
    backgroundColor: 'white',
    color: color.prime,
    fontSize: '1.2rem',
    hoverColor: color.vice,
    hoverBorder: `${color.vice} solid 1px`,
  }

  return (
    <div className="container pages">
      <StyledDiv>
        <img src="/common-pic/success.gif" alt="success" />
        <div className="order-number">訂單號：{number}</div>
        <p>感謝您的訂購</p>

        <div>
          <SolidA
            {...{
              margin: '10px',
              fontSize: '1.2rem',
              hoverBackgroundColor: color.vice,
            }}
            className="go-recipe"
            href="/recipes"
            alt="go-recipe"
          >
            逛烹飪包
          </SolidA>
          <SolidA {...strokeStyle} href={`/order-detail/${id}`} alt="go-order">
            查看訂單
          </SolidA>
          <SolidA {...strokeStyle} href="/shopping-cart" alt="go-cart">
            回購物車
          </SolidA>
        </div>
      </StyledDiv>
    </div>
  )
}
export default OrderSuccess
