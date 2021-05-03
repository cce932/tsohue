import React, { useState } from "react"
import { Col, Row, Spinner } from "react-bootstrap"
import styled from "styled-components"
import { Field, useFormikContext } from "formik"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"

import CartItemEditor from "./CartItemEditor"
import EditService from "services/edit.service"
import color from "shared/style/color"
import { splitToRows } from "shared/utility/common"
import { StrokeLabel } from "shared/components/styled"
import { versionOptions } from "shared/constants/options"
import { DELETE_CART_ITEM } from "./constant"
import { allPaths, recipe as recipePath } from "shared/constants/pathName"

const Item = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: 15px;
  margin: 20px 13px 40px 0; // [right: 13px] align to float-bottom
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

const FloatDiv = styled.div`
  position: absolute;
  text-align: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  margin: -20px;
`

const RelativeDiv = styled.div`
  position: relative;
  height: 100%;
`

const IngredientTd = styled.td`
  ${(props) => props.theme.font}
  color: ${(props) => props.theme.thirdColor};
  font-size: 0.8rem;
  padding: 4px;
  padding-left: 0;

  &.quantitiy-zero {
    color: ${(props) => props.theme.forthColor};
  }
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
  padding-left: 30px; // align to float-bottom

  & > input[type="checkbox"],
  label {
    margin-top: 40px;
    margin-right: 10px;
  }
`

const CartItem = ({
  cartId,
  recipe,
  customize,
  sum,
  isCustomize, // for controlling editable
  reactDispatch, // for deleting cart item
  ids, // for controlling selectAll checkbox
  updatingCart, // controlling updating spinner
}) => {
  const { values, setFieldValue } = useFormikContext()
  const [modalShow, setModalShow] = useState(false)

  const styled = customize.map((ingredient, index) => (
    <IngredientTd
      key={index}
      className={`${ingredient.quantityRequired === 0 ? "quantitiy-zero" : ""}`}
    >
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

    //　controll selectAll checkbox
    const currentCheckedLength = isChecked
      ? values.checked.length + 1
      : values.checked.length - 1
    !isChecked && setFieldValue("selectAll", false)
    ids.length === currentCheckedLength && setFieldValue("selectAll", true)
  }

  const editOnClick = () => {
    setModalShow(true)
  }

  const removeOnClick = () => {
    reactDispatch(DELETE_CART_ITEM, cartId) // delete this item on UI
    EditService.deleteCartItem(cartId) // delete this item's data in DB
    setFieldValue(
      "checked",
      values.checked.filter((itemId) => itemId !== cartId)
    ) // update the price
  }

  return (
    <FlexDiv>
      <div>
        <Field
          className="styled-checkbox"
          type="checkbox"
          name="checked"
          id={`styled-checkbox-${cartId}`}
          value={cartId}
          onChange={(e) => checkboxOnChange(e, cartId, sum)}
        />
        <label htmlFor={`styled-checkbox-${cartId}`}></label>
      </div>
      <Item>
        <Row>
          <Col sm="3">
            <a href={allPaths[recipePath] + recipe.id}>
              <ItmeImg src={"/common-pic/temp.jpg"} />
            </a>
          </Col>
          <Col sm="9">
            <BottomLine>
              <a href={`/recipe/${recipe.id}`}>
                <StyledFont weight="bold">{recipe.name}</StyledFont>
              </a>
              <StrokeLabel
                color={recipe.version.toLowerCase() + "Color"}
                borderColor={recipe.version.toLowerCase() + "Color"}
              >
                {versionOptions[recipe.version] + "版本"}
              </StrokeLabel>
              {isCustomize && <StrokeLabel>客製化</StrokeLabel>}
              <FloatRight>
                <StyledFont>NT. {sum}</StyledFont>
                <button onClick={removeOnClick}>
                  <AiOutlineDelete fill="#e76845" size="18px" />
                </button>
                <button onClick={editOnClick} disabled={!isCustomize}>
                  <AiOutlineEdit
                    fill={isCustomize ? color.third : color.forth}
                    size="18px"
                  />
                </button>
              </FloatRight>
            </BottomLine>

            <RelativeDiv>
              <StyledFont color="thirdColor" weight="bold" size="0.8rem">
                食材
              </StyledFont>
              <IngredientsTable>
                <tbody>{splited}</tbody>
              </IngredientsTable>
              {updatingCart.some((itemId) => itemId === cartId) && (
                <FloatDiv>
                  <Spinner animation="border" variant="warning" role="status" />
                </FloatDiv>
              )}
            </RelativeDiv>
          </Col>
        </Row>
      </Item>
      <CartItemEditor
        cartId={cartId}
        recipe={recipe}
        customize={customize}
        show={modalShow}
        onHide={() => setModalShow(false)}
        reactDispatch={reactDispatch}
      />
    </FlexDiv>
  )
}

export default CartItem
