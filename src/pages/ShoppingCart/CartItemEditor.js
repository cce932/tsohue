import React from "react"
import { Modal, Row } from "react-bootstrap"
import { Formik } from "formik"
import * as Yup from "yup"
import _ from "lodash"

import "shared/style/cartItemEditor.scss"
import IngredientAdjuster from "shared/components/IngredientAdjuster"
import { splitIngredientsByCategory } from "shared/utility/common"
import { categoryOptions } from "shared/constants/options"
import { LOAD_CART } from "./constant"
import editService from "services/edit.service"
import loadService from "services/load.service"

const initQuantityGenerator = (cartIngredients, outOfStockIngredients) => {
  let result = Object.assign({})
  for (const cartIngredient of cartIngredients) {
    const _ingredientId = cartIngredient.ingredient.id
    const isOutOfStock = outOfStockIngredients.includes(
      _ingredientId.toString()
    )

    result[_ingredientId] = {
      defaultQuantity: cartIngredient.quantityRequired,
      customizeQuantity: isOutOfStock ? 0 : cartIngredient.quantityRequired,
      price: cartIngredient.ingredient.price,
      cartId: cartIngredient.id,
    }
  }
  return result
}

const CartItemEditor = ({
  cartId,
  recipe,
  customize,
  reactDispatch, // a dispatch of react useReducer hook from Shopping Cart component
  show,
  onHide,
}) => {
  const splitedIngredients = splitIngredientsByCategory(customize)
  const initQuantity = initQuantityGenerator(
    customize,
    recipe.outOfStockIngredients
  )

  const updateOnClick = (cartId, values, onHide) => () => {
    const currentValue = values.ingredient
    const body = {
      customize: Object.keys(values.ingredient).map((ingredientId) => ({
        id: currentValue[ingredientId].cartId,
        ingredient: { id: ingredientId },
        quantityRequired: currentValue[ingredientId].customizeQuantity,
      })),
    }
    editService.editCartItem(cartId, body).then(() => {
      loadService.loadCart().then(({ data }) => {
        reactDispatch(LOAD_CART, data)
      })
    })
    onHide()
  }

  const validationSchema = Yup.object().shape({
    ingredient: Yup.lazy((obj) =>
      Yup.object(
        _.mapValues(obj, () =>
          Yup.object({
            customizeQuantity: Yup.number().max(20, "數量請低於20喔"),
          })
        )
      )
    ),
  })

  return (
    <Modal
      {...{ show, onHide }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="cart-item-editor"
    >
      <Formik
        initialValues={{
          ingredient: {
            ...initQuantity,
          },
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("submit", values)
        }}
      >
        {({ values, errors, handleSubmit, handleReset }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <p className="title">編輯食材</p>
              <Row>
                {Object.keys(splitedIngredients).map(
                  (category, index) =>
                    splitedIngredients[category].length > 0 && (
                      <IngredientAdjuster
                        key={index}
                        categoryName={categoryOptions[category]}
                        categoryIngredients={splitedIngredients[category]}
                        outOfStockIngredients={recipe.outOfStockIngredients}
                      />
                    )
                )}
              </Row>
              <div className="right">
                <button
                  onClick={updateOnClick(cartId, values, onHide)}
                  type="submit"
                  disabled={!_.isEmpty(errors)}
                >
                  確定
                </button>
                <button onClick={handleReset} type="reset">
                  重設數量
                </button>
                <button onClick={onHide}>取消</button>
              </div>
            </Modal.Body>
          </form>
        )}
      </Formik>
    </Modal>
  )
}

export default CartItemEditor