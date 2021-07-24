import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledDiv = styled.div`
  text-align: center;
  margin: 20px 0;

  img {
    width: 250px;
    opacity: 0.7;
  }

  > div {
    ${(props) => props.theme.font}
    color: ${(props) => props.theme.thirdColor};
    font-size: 1.2rem;
    margin-top: 20px;
  }
`

const Empty = ({ message }) => {
  return (
    <StyledDiv className="empty">
      <img src="/common-pic/emptyCart.png" alt="empty-cart" />
      <div>{message}</div>
    </StyledDiv>
  )
}

Empty.propTypes = {
  message: PropTypes.string.isRequired,
}

export default Empty
