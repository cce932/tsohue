import _ from "lodash"
import React from "react"
import { Row, Col } from "react-bootstrap"
import { Formik } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { IoIosUnlock } from "react-icons/io"

import "shared/style/vipCartAdder.scss"
import { categoryOptions } from "shared/constants/options"
import { splitIngredientsByCategory } from "shared/utility/common"
import IngredientsAdjuster from "shared/components/IngredientAdjuster"
import { addCartForCustomization } from "actions/add"
import { VIP } from "shared/constants/common"

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
  previousValuesForLogin
) => {
  let result = Object.assign({})
  for (const ingredient of ingredients) {
    const _ingredientId = ingredient.ingredient.id
    const isOutOfStock = outOfStockIngredients.includes(
      _ingredientId.toString()
    )
    const _previousValue = previousValuesForLogin?.ingredient?._ingredientId

    result[_ingredientId] = {
      defaultQuantity: ingredient.quantityRequired,
      customizeQuantity: isOutOfStock
        ? 0
        : _previousValue
        ? _previousValue
        : ingredient.quantityRequired,
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
  const splitedIngredients = splitIngredientsByCategory(ingredients)
  const isWholeOutOfStock = // ture if more than 1/2 of ingredients out of stock in this recipe
    outOfStockIngredients.length > _.floor(ingredients.length / 2)
  const initQuantity = initQuantityGenerator(
    ingredients,
    outOfStockIngredients,
    localStorage.getItem(recipeId)
  )
  const isVip = user.role === VIP

  const passPriceToAdder = (setFieldValue) => ({
    price,
    isPurchaseNothing,
  }) => {
    setFieldValue("currentPrice", price)
    setFieldValue("isPurchaseNothing", isPurchaseNothing)
  }

  const validationSchema = Yup.object().shape({
    ingredient: Yup.lazy((obj) =>
      Yup.object(
        _.mapValues(obj, () =>
          Yup.object({
            customizeQuantity: Yup.number()
              .typeError("請輸入數字喔")
              .required("請輸入數量喔")
              .integer("須為整數喔")
              .min(0, "數量不可為負喔")
              .max(20, "數量請低於20喔"),
          })
        )
      )
    ),
  })

  const vipAddCartOnClick = (values) => {
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

    dispatch(addCartForCustomization(cartData)).then(() => {
      window.alert("已加入購物車")
    })
  }

  return (
    <div className="member-cart-adder vip-cart-adder">
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
            <Row>
              <Col sm="10">
                <Row>
                  {Object.keys(splitedIngredients).map(
                    (category, index) =>
                      splitedIngredients[category].length > 0 && (
                        <IngredientsAdjuster
                          key={index}
                          categoryName={categoryOptions[category]}
                          categoryIngredients={splitedIngredients[category]}
                          outOfStockIngredients={outOfStockIngredients}
                          passPriceToAdder={passPriceToAdder(setFieldValue)}
                          handmadePrice={handmadePrice}
                        />
                      )
                  )}
                </Row>
              </Col>
              <Col sm="2" className="button">
                <div>
                  <label className="price" name="currentPrice">
                    {"總額 NT. "}
                    {values.currentPrice < 0 ? price : values.currentPrice}
                  </label>
                  <div className="fee-notification">內含客製化服務費</div>
                  <button className="reset" type="reset" onClick={handleReset}>
                    重設數量
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className={`${!isVip && "vip-upgrade"}`}
                    disabled={
                      !_.isEmpty(errors) ||
                      isWholeOutOfStock ||
                      values.isPurchaseNothing ||
                      !isVip
                    }
                  >
                    {isVip ? (
                      "加入購物車"
                    ) : (
                      <>
                        <IoIosUnlock size="18px" />
                        升級VIP
                      </>
                    )}
                  </button>
                  <div className="error-msg">
                    {isWholeOutOfStock
                      ? "目前無存貨"
                      : values.isPurchaseNothing
                      ? "至少購買1樣食材喔"
                      : ""}
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

export default CartAdderForCustomization
