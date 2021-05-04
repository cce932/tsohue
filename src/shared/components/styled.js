import styled from "styled-components"

export const ExpandDiv = styled.div`
  width: 100%;
  height: max-content;
`

export const PrimaryBtn = styled.button`
  font-family: sans-serif;
  font-weight: normal;
  font-size: 1rem;
  color: white;
  text-decoration: none;
  letter-spacing: 0.03em;

  background-color: rgb(231, 104, 69);
  border: none;
  border-radius: 3px;
  padding: 5px 15px;
  margin: 5px;
  transition: all 0.3s ease 0s;
`

export const SecondaryBtn = styled.button`
  font-family: sans-serif;
  font-weight: normal;
  font-size: 1rem;
  color: white;
  text-decoration: none;
  letter-spacing: 0.03em;

  height: fit-content;
  background-color: rgb(86, 90, 95);
  border: none;
  border-radius: 3px;
  padding: 5px 15px;
  margin: 5px;
  transition: all 0.3s ease 0s;
`

export const ThirdBtn = styled.button`
  font-family: sans-serif;
  font-weight: normal;
  font-size: 1rem;
  color: white;
  text-decoration: none;
  letter-spacing: 0.03em;

  height: fit-content;
  background-color: rgb(179, 183, 188);
  border: none;
  border-radius: 3px;
  padding: 5px 15px;
  margin: 5px;
  transition: all 0.3s ease 0s;
`

export const StrokeLabel = styled.span`
  font-family: sans-serif;
  font-weight: normal;
  font-size: ${(props) => props.size || "0.8rem"};
  color: ${(props) => props.theme[props.color] || props.theme.primeColor};
  text-decoration: none;
  letter-spacing: 0.03em;

  background-color: white;
  border: ${(props) => props.theme[props.borderColor] || props.theme.primeColor}
    solid 1px;
  border-radius: 25px;
  padding: 2px 8px;
  margin-left: 15px;
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
