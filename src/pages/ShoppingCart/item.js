import React from "react"
import { Col, Row } from "react-bootstrap"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { Field, useFormikContext } from "formik"

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { splitToRows } from "shared/utility/common"
import { StrokeLabel } from "shared/components/styled"
import { versionOptions } from "shared/constants/options"
import { removeCartItem } from "actions/edit"

const Item = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: 15px;
  margin: 20px 0 40px;
  border: 1px ${(props) => props.theme.fifthColor} solid;
  background-color: white;
  padding: 20px 25px;
`

const ItmeImg = styled.img`
  width: 100%;
  border-radius: 13px;
`

const FloatRight = styled.div`
  float: right;
  & > button {
    margin-left: 15px;

    svg {
      margin-top: -4px;
    }
  }
`

const BottomLine = styled.div`
  padding-bottom: 10px;
  margin-bottom: 8px;
  border-bottom: solid ${(props) => props.theme.fifthColor} 1px;
`

const IngredientTd = styled.td`
  ${(props) => props.theme.font}
  color: ${(props) => props.theme.thirdColor};
  font-size: 0.8rem;
  padding: 4px;
  padding-left: 0;
`

const StyledFont = styled.span`
  ${(props) => props.theme.font}
  color: ${(props) => props.theme[props.color] || props.theme.primeColor};
  font-weight: ${(props) => props.weight || "normal"};
  font-size: ${(props) => props.size || "1rem"};
`

const IngredientsTable = styled.table`
  width: 100%;
  margin-top: 5px;
`

const FlexDiv = styled.div`
  display: flex;

  & > input[type="checkbox"],
  label {
    margin-top: 40px;
    margin-right: 10px;
  }
`

const SingleCart = ({ cartId, recipe, customize, sum, isCustomize }) => {
  const dispatch = useDispatch()
  const { values, setFieldValue } = useFormikContext()

  const remove = (cartId) => () => {
    dispatch(removeCartItem(cartId))
  }

  const styled = customize.map((ingredient, index) => (
    <IngredientTd key={index}>
      {ingredient.ingredient.name + " "}
      {ingredient.quantityRequired + " "}
      {ingredient.ingredient.unit}
    </IngredientTd>
  ))

  const splited = splitToRows(styled, 3).map((gredients, index) => (
    <tr className="g-row" key={index}>
      {gredients}
    </tr>
  ))

  const checkboxOnChange = (e, currentCartId, currentCartPrice) => {
    const prevChecked = values.checked
    const prevCurrentSum = values.currentSum
    const isChecked = e.target.checked
    const newChecked = isChecked
      ? [...prevChecked, currentCartId]
      : prevChecked.filter((cartId) => cartId !== currentCartId)
    const newCurrentSum = isChecked
      ? prevCurrentSum + currentCartPrice
      : prevCurrentSum - currentCartPrice

    setFieldValue("checked", newChecked)
    setFieldValue("currentSum", newCurrentSum)
  }

  return (
    <FlexDiv>
      <div>
        <Field
          className="styled-checkbox"
          type="checkbox"
          name="checked"
          id={`styled-checkbox-${cartId.toString()}`}
          value={cartId.toString()}
          onChange={(e) => checkboxOnChange(e, cartId.toString(), sum)}
        />
        <label htmlFor={`styled-checkbox-${cartId.toString()}`}></label>
      </div>
      <Item>
        <Row>
          <Col sm="3">
            <ItmeImg src="/common-pic/temp.jpg" />
          </Col>
          <Col sm="9">
            <BottomLine>
              <StyledFont weight="bold">{recipe.name}</StyledFont>
              <StrokeLabel
                color={recipe.version.toLowerCase() + "Color"}
                borderColor={recipe.version.toLowerCase() + "Color"}
              >
                {versionOptions[recipe.version] + "版本"}
              </StrokeLabel>
              {isCustomize && <StrokeLabel>客製化</StrokeLabel>}
              <FloatRight>
                <StyledFont>NT. {sum}</StyledFont>
                <button onClick={remove(cartId)}>
                  <AiOutlineDelete fill="#e76845" size="18px" />
                </button>
                <button>
                  <AiOutlineEdit fill="#818487" size="18px" />
                </button>
              </FloatRight>
            </BottomLine>

            <div>
              <StyledFont color="thirdColor" weight="bold" size="0.8rem">
                食材
              </StyledFont>
              <IngredientsTable>
                <tbody>{splited}</tbody>
              </IngredientsTable>
            </div>
          </Col>
        </Row>
      </Item>
    </FlexDiv>
  )
}

export default SingleCart
