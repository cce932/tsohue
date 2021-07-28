import styled from 'styled-components'

export const ExpandDiv = styled.div`
  width: 100%;
  height: max-content;
`

export const SolidA = styled.a`
  font-family: sans-serif;
  font-weight: normal;
  font-size: ${(props) => props.fontSize || '1rem'};
  text-decoration: none;
  letter-spacing: 0.03em;

  color: ${(props) => props.color || 'white'};
  background-color: ${(props) =>
    props.backgroundColor || props.theme.primeColor};
  border: ${(props) => props.border || 'none'};

  height: fit-content;
  padding: ${(props) => props.padding || '5px 15px'};
  margin: ${(props) => props.margin || '5px'};
  border-radius: 25px;
  display: inline-block;
  transition: all 0.3s ease 0s;

  &:hover {
    color: ${(props) => props.hoverColor || props.color || 'white'};
    background-color: ${(props) =>
      props.hoverBackgroundColor ||
      props.backgroundColor ||
      props.theme.primeColor};
    border: ${(props) => props.hoverBorder || props.border || 'none'};
  }
`

export const SolidBtn = styled.button`
  font-family: sans-serif;
  font-weight: normal;
  font-size: ${(props) => props.fontSize || '1rem'};
  text-decoration: none;
  letter-spacing: 0.03em;

  color: ${(props) => props.color || 'white'};
  background-color: ${(props) =>
    props.backgroundColor || props.theme.primeColor};
  border: ${(props) => props.border || 'none'};

  height: fit-content;
  padding: ${(props) => props.padding || '5px 15px'};
  margin: ${(props) => props.margin || '5px'};
  border-radius: 25px;
  display: inline-block;
  transition: all 0.3s ease 0s;

  &:hover {
    color: ${(props) => props.hoverColor || props.color || 'white'};
    background-color: ${(props) =>
      props.hoverBackgroundColor ||
      props.backgroundColor ||
      props.theme.primeColor};
    opacity: 0.8;
    border: ${(props) => props.hoverBorder || props.border || 'none'};
  }
`

export const StrokeSpan = styled.span`
  font-family: sans-serif;
  font-weight: normal;
  font-size: ${(props) => props.size || '0.8rem'};
  color: ${(props) => props.theme[props.color] || props.theme.primeColor};
  text-decoration: none;
  letter-spacing: 0.03em;

  background-color: white;
  border: ${(props) =>
      props.theme[props.borderColor] ||
      props.theme[props.color] ||
      props.theme.primeColor}
    solid 1px;
  border-radius: 25px;
  padding: ${(props) => props.padding || '2px 8px'};
  margin: ${(props) => props.margin || '0 0 0 15px'};
  line-height: ${(props) => props.lineHeight || '2'};
  transition: all 0.3s ease 0s;
`

export const SemiRoundedLabel = styled.label`
  font-family: sans-serif;
  font-weight: bolder;
  font-size: 0.9rem;
  color: #9e8568;
  text-decoration: none;
  letter-spacing: 0.03em;

  background-color: white;
  border-radius: 25px 0 0 25px;
  padding: 4px;
  padding-left: 12px;
  transition: all 0.3s ease 0s;
`

export const StyledP = styled.p`
  ${(props) => props.theme.font}
  color: ${(props) => props.color || props.theme.secondaryColor};
  font-weight: ${(props) => props.weight || 'normal'};
  font-size: ${(props) => props.fontSize || '1rem'};
  padding: ${(props) => props.padding || '0'};
  margin: ${(props) => props.margin || '0'};
  width: ${(props) => props.width || 'auto'};
  line-height: ${(props) => props.lineHeight || 'auto'};
  text-align: justify;
  min-height: ${(props) => props.minHeight || 'auto'};
`

export const StyledLabel = styled.label`
  ${(props) => props.theme.font}
  color: ${(props) => props.color || props.theme.secondaryColor};
  font-weight: ${(props) => props.weight || 'normal'};
  font-size: ${(props) => props.fontSize || '1rem'};
  padding: ${(props) => props.padding || '0'};
  margin: ${(props) => props.margin || '0'};
  width: ${(props) => props.width || 'auto'};
  line-height: ${(props) => props.lineHeight || 'auto'};
`
