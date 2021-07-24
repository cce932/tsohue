import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import 'shared/style/memberCartAdder.scss'
import { categoryOptions } from 'shared/constants/options'
import { splitIngredientsByCategory } from 'shared/utility/common'
import { addCartForDefault } from 'actions/add'

const CartAdderForDefault = ({
  recipeId,
  ingredients,
  price,
  isOutOfStock, // ture if one of ingredients out of stock in this recipe
}) => {
  const dispatch = useDispatch()
  const splitedIngredients = splitIngredientsByCategory(ingredients)
  const user = useSelector((state) => state.auth.user)

  const AddCartForDefaultOnClick = () => {
    if (!user) {
      window.location = `/login?next=${window.location.pathname}`
    }

    dispatch(addCartForDefault(recipeId)).then(() => {
      window.alert('已加入購物車')
    })
  }

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
                      <label>{ingredient.ingredient.unit}</label>
                    </div>
                  ))}
                </div>
              </Col>
            ),
        )}
        <Col className="button">
          <div>
            <label className="price">{`總額 NT. ${price}`}</label>
            <button
              type="submit"
              onClick={AddCartForDefaultOnClick}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? '目前無存貨' : '加入購物車'}
            </button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

CartAdderForDefault.propTypes = {
  recipeId: PropTypes.number.isRequired,
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  isOutOfStock: PropTypes.bool.isRequired,
}

export default CartAdderForDefault
