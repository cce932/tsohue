import styled from "styled-components"

const StyledDiv = styled.div`
  text-align: center;
  flex-grow: 1;
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
  font-family: sans-serif;
  font-weight: normal;
  font-size: 1rem;
  color: #9e8568;
  text-decoration: none;
  letter-spacing: 0.03em;

  border-bottom: 4px solid #fbd779;

  &:hover {
    text-decoration: none;
    color: #755734;
  }
`

const RecipeNotFound = () => (
  <StyledDiv>
    <img src="/common-pic/notFound.gif" alt="not-found" width="300px"></img>
    <StyledP>不好意思 此食譜已下架囉～</StyledP>
    <StyledA href="/recipe">點我看更多食譜</StyledA>
  </StyledDiv>
)

export default RecipeNotFound
