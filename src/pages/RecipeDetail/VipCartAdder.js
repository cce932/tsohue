import _ from "lodash"
import React from "react"
import { Row, Col } from "react-bootstrap"
import { Formik } from "formik"
import * as Yup from "yup"

import "shared/style/vipCartAdder.scss"
import { categoryOptions } from "shared/constants/options"
import { splitIngredientsByCategory } from "shared/utility/common"
import IngredientsAdjuster from "shared/components/IngredientAdjuster"

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
const initQuantityGenerator = (ingredients, outOfStockIngredients) => {
  let result = Object.assign({})
  for (const ingredient of ingredients) {
    const isOutOfStock = outOfStockIngredients.includes(
      ingredient.ingredient.id.toString()
    )

    result[ingredient.ingredient.id] = {
      defaultQuantity: ingredient.quantityRequired,
      customizeQuantity: isOutOfStock ? 0 : ingredient.quantityRequired,
      price: ingredient.ingredient.price,
    }
  }
  return result
}

const VipCartAdder = ({
  ingredients,
  price,
  outOfStockIngredients,
  vipAddCartOnClick,
  handmadePrice,
}) => {
  const splitedIngredients = splitIngredientsByCategory(ingredients)
  const isWholeOutOfStock = // ture if more than 1/2 of ingredients out of stock in this recipe
    outOfStockIngredients.length > _.floor(ingredients.length / 2)
  const initQuantity = initQuantityGenerator(ingredients, outOfStockIngredients)

  const passPriceToAdder = (setFieldValue) => (price) => {
    setFieldValue("currentPrice", price)
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

  return (
    <div className="member-cart-adder vip-cart-adder">
      <Formik
        initialValues={{
          ingredient: {
            ...initQuantity,
          },
          currentPrice: price,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {({ values, handleSubmit, setFieldValue, handleReset }) => (
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

                  <button className="reset" type="reset" onClick={handleReset}>
                    重設數量
                  </button>

                  <button
                    type="submit"
                    onClick={vipAddCartOnClick}
                    className={!isWholeOutOfStock ? "" : "disable"}
                  >
                    {isWholeOutOfStock ? "目前無存貨" : "加入購物車"}
                  </button>
                </div>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default VipCartAdder
