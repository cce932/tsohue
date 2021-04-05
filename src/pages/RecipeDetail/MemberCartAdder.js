import React from "react"
import { Row, Col } from "react-bootstrap"

import "shared/style/memberCartAdder.scss"
import { categoryOptions } from "shared/constants/options"
import { splitIngredientsByCategory } from "shared/utility/common"

const MemberCartAdder = (props) => {
  const ingredients = props.ingredients
  const price = props.price
  const isOutOfStock = props.isOutOfStock
  const splitedIngredients = splitIngredientsByCategory(ingredients)

  return (
    <div className="member-cart-adder">
      <Row>
        {Object.keys(splitedIngredients).map(
          (key, index) =>
            splitedIngredients[key].length > 0 && (
              <Col key={index}>
                <p className="category">{categoryOptions[key]}</p>
                <div className="ingredients-block">
                  {splitedIngredients[key].map((ingredient, index) => (
                    <div key={index}>
                      <label>{ingredient.ingredient.name}</label>
                      <label>{ingredient.quantityRequired}</label>
                      <label>份/{ingredient.ingredient.unit}</label>
                    </div>
                  ))}
                </div>
              </Col>
            )
        )}
        <Col className="button">
          <div>
            <span>{isOutOfStock && "目前無存貨"}</span>
            <p>$ {price}</p>
            <button
              onClick={props.memberAddCartOnClick}
              className={isOutOfStock ? "disable" : ""}
            >
              加入購物車
            </button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default MemberCartAdder
