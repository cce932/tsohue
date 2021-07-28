import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Row } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import _ from 'lodash'

import 'shared/style/cartItemEditor.scss'
import IngredientAdjuster from 'shared/components/IngredientAdjuster'
import { splitIngredientsByCategory } from 'shared/utility/common'
import { categoryOptions } from 'shared/constants/options'
import {
  UPDATE_CART_ITEM_START,
  UPDATE_CART_ITEM_END,
  UPDATE_CART_ITEM,
} from './constant'
import editService from 'services/edit.service'

const initQuantityGenerator = (
  defalutIngredients,
  cartIngredients,
  outOfStockIngredients,
) => {
  const result = Object.assign({})

  try {
    for (let i = 0; i < defalutIngredients.length; i++) {
      const _ingredientId = cartIngredients[i].ingredient.id
      const isOutOfStock = outOfStockIngredients.includes(
        _ingredientId.toString(),
      )

      result[_ingredientId] = {
        defaultQuantity: defalutIngredients[i].quantityRequired, // for recommand quantity
        customizeQuantity: isOutOfStock
          ? 0
          : cartIngredients[i].quantityRequired,
        price: cartIngredients[i].ingredient.price,
        cartId: cartIngredients[i].id,
      }
    }

    return result
  } catch (e) {
    console.error('recipe updated > [recipe ingredients] async with the [cart ingreidnets] > cause the CartItemEditor error')
  }
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
    recipe.recipeIngredients,
    customize,
    recipe.outOfStockIngredients,
  )

  const updateOnClick = (e) => (cartId, values, onHide) => {
    onHide(e) // pass `e` to prevent the  submit action of nested Formik with ShoppingCart

    const currentValue = values.ingredient
    const body = {
      customize: Object.keys(values.ingredient).map((ingredientId) => ({
        id: currentValue[ingredientId].cartId,
        ingredient: { id: ingredientId },
        quantityRequired: currentValue[ingredientId].customizeQuantity,
      })),
    }

    reactDispatch(UPDATE_CART_ITEM_START, cartId) // show loading spinner
    editService.editCartItem(cartId, body).then(({ data }) => {
      reactDispatch(UPDATE_CART_ITEM, data)
      reactDispatch(UPDATE_CART_ITEM_END, cartId) // cancel loading spinner
    })
  }

  const validationSchema = Yup.object().shape({
    ingredient: Yup.lazy((obj) =>
      Yup.object(
        _.mapValues(obj, () =>
          Yup.object({
            customizeQuantity: Yup.number().max(20, '數量請低於20喔'),
          }),
        ),
      ),
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
          console.log('submit', values)
        }}
      >
        {({ values, errors }) => (
          <form>
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
                    ),
                )}
              </Row>
              <div className="right">
                <button
                  onClick={(e) => updateOnClick(e)(cartId, values, onHide)}
                  className="submit" // do not use type="submit" in order to prevent the  submit action of nested Formik with ShoppingCart
                  disabled={!_.isEmpty(errors)}
                >
                  確定
                </button>
                {/*  Return to customized quantity
                But it would cause user confuse so not valid for now
                <button onClick={handleReset} type="reset">
                  重設
                </button> */}
                <button className="hide" onClick={onHide}>
                  離開
                </button>
              </div>
            </Modal.Body>
          </form>
        )}
      </Formik>
    </Modal>
  )
}

CartItemEditor.propTypes = {
  cartId: PropTypes.string.isRequired,
  recipe: PropTypes.object.isRequired,
  customize: PropTypes.array.isRequired,
  reactDispatch: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
}

export default CartItemEditor
