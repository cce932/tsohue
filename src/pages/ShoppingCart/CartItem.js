import React, { useState } from "react"
import styled from "styled-components"
import { Field, useFormikContext } from "formik"

import CartItemEditor from "./CartItemEditor"
import EditService from "services/edit.service"
import { DELETE_CART_ITEM } from "./constant"
import OrderedRecipe from "shared/components/OrderedRecipe"

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
  recipeImage,
  isCustomize, // for controlling editable
  modifiable = true, // if false, no need to pass following three props
  reactDispatch = () => null, // for deleting cart item
  ids = [], // for controlling selectAll checkbox
  updatingCart = false, // controlling updating spinner
}) => {
  const { values, setFieldValue } = useFormikContext()
  const [modalShow, setModalShow] = useState(false)

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

  const editOnClick = (e) => {
    e.preventDefault()
    setModalShow(true)
  }

  const removeOnClick = () => {
    if (window.confirm("您確定要刪除此項烹飪包嗎？")) {
      reactDispatch(DELETE_CART_ITEM, cartId) // delete this item on UI
      EditService.deleteCartItem(cartId) // delete this item's data in DB
      setFieldValue(
        "checked",
        values.checked.filter((itemId) => itemId !== cartId)
      ) // update the price
    }
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

      <OrderedRecipe
        {...{
          cartId,
          recipe,
          customize,
          sum,
          recipeImage,
          isCustomize,
          modifiable,
          updatingCart,
          editOnClick,
          removeOnClick,
        }}
      />

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
