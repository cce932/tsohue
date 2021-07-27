import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import 'shared/style/cartAdderForDefault.scss'
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
    <div className="default-cart-adder">
      <Row sm="1" md="2">
        <Col md="9" lg="10">
          <Row xs="2" sm="2" lg="4">
            {Object.keys(splitedIngredients).map(
              (key, index) =>
                splitedIngredients[key].length > 0 && (
                  <Col key={index}>
                    <p className="category">{categoryOptions[key]}</p>
                    <div className="ingredients-block">
                      {splitedIngredients[key].map((ingredient, index) => (
                        <div key={index}>
                          {`${ingredient.ingredient.name} ${ingredient.quantityRequired} ${ingredient.ingredient.unit}`}
                        </div>
                      ))}
                    </div>
                  </Col>
                ),
            )}
          </Row>
        </Col>
        <Col md="3" lg="2" className="add-cart-btn">
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
  recipeId: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  isOutOfStock: PropTypes.bool.isRequired,
}

export default CartAdderForDefault
