import styled from "styled-components"

const StyledDiv = styled.div`
  text-align: center;
  padding-top: 100px;
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
    <StyledP>{message || "不好意思 此食譜已下架囉～"}</StyledP>
    <StyledA href="/recipes">點我繼續逛食譜</StyledA>
  </StyledDiv>
)

export default NotFound
