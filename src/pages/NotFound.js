import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledDiv = styled.div`
  text-align: center;
  margin-top: 150px !important;
  padding-bottom: 40px;
`

const StyledP = styled.p`
  font-family: sans-serif;
  font-weight: normal;
  font-size: 1.5rem;
  color: #755734;
  text-decoration: none;
  letter-spacing: 0.03em;

  padding-left: 10px;
`

const StyledA = styled.a`
  font-weight: normal;
  font-size: 1rem;
  color: ${(props) => props.theme.primeColor};
  ${(props) => props.theme.font}}
  border-bottom: 3px solid ${(props) => props.theme.accentColor};

  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.viceColor};
  }
`

const NotFound = ({ message }) => (
  <StyledDiv className="pages">
    <img src="/common-pic/notFound.gif" alt="not-found" width="300px"></img>
    <StyledP>{message}</StyledP>
    <StyledA href="/recipes">點我看更多烹飪包</StyledA>
  </StyledDiv>
)

NotFound.propTypes = {
  message: PropTypes.string.isRequired,
}

export default NotFound
