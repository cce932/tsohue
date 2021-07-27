import _ from 'lodash'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Spinner } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosUnlock } from 'react-icons/io'

import 'shared/style/cartAdderForCustomization.scss'
import { categoryOptions } from 'shared/constants/options'
import { splitIngredientsByCategory } from 'shared/utility/common'
import IngredientAdjuster from 'shared/components/IngredientAdjuster'
import { addCartForCustomization, addCartForDefault } from 'actions/add'
import { VIP } from 'shared/constants/common'

// format of formik value
// ingredient: {
//   10: {
//     defaultQuantity: 10,
//     customizeQuantity: 10,
//     price: 30,
//   },
//   11: {
//     defaultQuantity: 3,
//     customizeQuantity: 0, // if 11 is out of stock
//     price: 50,
//   },
// }

const initQuantityGenerator = (
  ingredients,
  outOfStockIngredients,
  previousValuesForLogin,
) => {
  const result = Object.assign({})
  for (const ingredient of ingredients) {
    const _ingredientId = ingredient.ingredient.id
    const isOutOfStock = outOfStockIngredients.includes(
      _ingredientId.toString(),
    )
    const _previousValue = previousValuesForLogin?.ingredient?._ingredientId

    result[_ingredientId] = {
      defaultQuantity: ingredient.quantityRequired,
      customizeQuantity: isOutOfStock
        ? 0
        : _previousValue || ingredient.quantityRequired,
      price: ingredient.ingredient.price,
    }
  }
  return result
}

const CartAdderForCustomization = ({
  recipeId,
  ingredients,
  price,
  outOfStockIngredients,
  handmadePrice,
}) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const splitedIngredients = splitIngredientsByCategory(ingredients)
  const isWholeOutOfStock = // ture if more than 1/2 of ingredients out of stock in this recipe
    outOfStockIngredients.length > _.floor(ingredients.length / 2)
  const initQuantity = initQuantityGenerator(
    ingredients,
    outOfStockIngredients,
    localStorage.getItem(recipeId),
  )
  const isVip = user?.role === VIP

  const passPriceToAdder = (setFieldValue) => ({
    price,
    isPurchaseNothing,
  }) => {
    setFieldValue('currentPrice', price)
    setFieldValue('isPurchaseNothing', isPurchaseNothing)
  }

  const validationSchema = Yup.object().shape({
    ingredient: Yup.lazy((obj) =>
      Yup.object(
        _.mapValues(obj, () =>
          Yup.object({
            customizeQuantity: Yup.number()
              .typeError('請輸入數字喔')
              .required('請輸入數量喔')
              .integer('須為整數喔')
              .min(0, '數量不可為負喔')
              .max(20, '數量請低於20喔'),
          }),
        ),
      ),
    ),
  })

  const vipAddCartOnClick = (values) => {
    setIsSubmitting(true)
    if (!user) {
      window.location = `/login?next=${window.location.pathname}`
      localStorage.setItem(recipeId, JSON.stringify(values))
    }

    const customizedIngredients = values.ingredient
    const cartData = {
      recipeId,
      customize: Object.keys(customizedIngredients).map((ingredientId) => ({
        ingredientId,
        quantityRequired: customizedIngredients[ingredientId].customizeQuantity,
      })),
    }

    if (values.currentPrice < 0) {
      // currentPrice < 0 from IngredientAdjuster means that the quantities are default
      dispatch(addCartForDefault(recipeId)).then(() => {
        setIsSubmitting(false)
        window.alert('已加入購物車')
      })
    } else {
      dispatch(addCartForCustomization(cartData)).then(() => {
        setIsSubmitting(false)
        window.alert('已加入購物車 [客製化]')
      })
    }
  }

  return (
    <div className="default-cart-adder customization-cart-adder">
      <Formik
        initialValues={{
          ingredient: {
            ...initQuantity,
          },
          currentPrice: price,
          isPurchaseNothing: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          vipAddCartOnClick(values)
        }}
      >
        {({ values, errors, handleSubmit, setFieldValue, handleReset }) => (
          <form onSubmit={handleSubmit}>
            <Row sm="1" lg="2">
              <Col lg="10">
                <Row xs="2" sm="2" md="4">
                  {Object.keys(splitedIngredients).map(
                    (category, index) =>
                      splitedIngredients[category].length > 0 && (
                        <IngredientAdjuster
                          key={index}
                          categoryName={categoryOptions[category]}
                          categoryIngredients={splitedIngredients[category]}
                          outOfStockIngredients={outOfStockIngredients}
                          passPriceToAdder={passPriceToAdder(setFieldValue)}
                          handmadePrice={handmadePrice}
                        />
                      ),
                  )}
                </Row>
              </Col>
              <Col lg="2" className="add-cart-btn">
                <div>
                  <label className="price" name="currentPrice">
                    {'總額 NT. '}
                    {values.currentPrice < 0 ? price : values.currentPrice}
                  </label>
                  <div className="fee-notification">內含客製化服務費</div>
                  <button className="reset" type="reset" onClick={handleReset}>
                    重設數量
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className={`${!isVip && 'vip-upgrade'}`}
                    disabled={
                      !_.isEmpty(errors) ||
                      isWholeOutOfStock ||
                      values.isPurchaseNothing ||
                      !isVip
                    }
                  >
                    {isVip
                      ? (
                          isSubmitting
                            ? (
                        <Spinner animation="border" variant="light" size="sm" />
                              )
                            : (
                                '加入購物車'
                              )
                        )
                      : (
                      <>
                        <IoIosUnlock size="18px" />
                        升級VIP
                      </>
                        )}
                  </button>
                  <div className="error-msg">
                    {isWholeOutOfStock
                      ? '目前無存貨'
                      : values.isPurchaseNothing
                        ? '至少購買1樣食材喔'
                        : ''}
                  </div>
                </div>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    </div>
  )
}

CartAdderForCustomization.propTypes = {
  recipeId: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  outOfStockIngredients: PropTypes.array.isRequired,
  handmadePrice: PropTypes.number.isRequired,
}

export default CartAdderForCustomization
