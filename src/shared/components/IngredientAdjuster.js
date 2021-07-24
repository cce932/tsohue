import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'

import { Col } from 'react-bootstrap'
import { FaPlus, FaMinus } from 'react-icons/fa'

import 'shared/style/components/ingredientAdjuster.scss'

const IngredientsAdjuster = ({
  categoryName,
  categoryIngredients,
  outOfStockIngredients,
  handmadePrice = 0,
  passPriceToAdder = null,
}) => {
  const { values, setFieldValue, errors } = useFormikContext()

  useEffect(() => {
    passPriceToAdder && passPriceToAdder(calculatePrice(values))
  }, [values.ingredient, errors])

  // 1. return value of customize ingredients price =
  //    each ingredient's [price * number]
  //    + [handmadePrice]
  // 2. return value of default ingredients = -1
  const calculatePrice = (formikValues) => {
    let _price = 0
    let isDefault = true
    let isPurchaseNothing = true // whether more than one ingredient's quantity>0 or not

    if (errors.ingredient?.length) return -1

    try {
      for (const formikValue of Object.values(formikValues.ingredient)) {
        isDefault =
          formikValue.customizeQuantity !== formikValue.defaultQuantity
            ? false
            : isDefault

        isPurchaseNothing =
          parseInt(formikValue.customizeQuantity) !== 0
            ? false
            : isPurchaseNothing

        _price +=
          parseInt(formikValue.customizeQuantity) * parseInt(formikValue.price)
      }
    } catch (e) {
      return -1
    }

    return {
      price: isDefault ? -1 : _price + parseInt(handmadePrice),
      isPurchaseNothing,
    }
  }

  const addOnClick = (e) => {
    e.preventDefault()
    const ingredientId = e.currentTarget.name // In order to binding the each input, set the name of button with ingredient id
    const originQuantity = parseInt(
      values.ingredient[ingredientId].customizeQuantity,
    )

    setFieldValue(
      `ingredient.${ingredientId}.customizeQuantity`,
      originQuantity + 1,
    )
  }

  const minusOnClick = (e) => {
    e.preventDefault()
    const ingredientId = e.currentTarget.name
    const quantity = parseInt(values.ingredient[ingredientId].customizeQuantity)

    if (quantity > 0) {
      setFieldValue(
        `ingredient.${ingredientId}.customizeQuantity`,
        parseInt(values.ingredient[ingredientId].customizeQuantity) - 1,
      )
    }
  }

  const inputOnChange = (e) => {
    const value = e.target.value
    const formikFieldValue = e.target.name

    setFieldValue(formikFieldValue, value.replace(/[^\d]/g, ''))
  }

  return (
    <Col className="ingredient-adjuster">
      <p className="category">{categoryName}</p>
      <div className="ingredients-block">
        {categoryIngredients.map((splitedIngredient, index) => {
          const ingredient = splitedIngredient.ingredient
          const isOutOfStock = outOfStockIngredients.includes(
            ingredient.id.toString(),
          )
          const ingredientQuantity =
            values.ingredient[ingredient.id].customizeQuantity
          const defaultQuantity =
            values.ingredient[ingredient.id].defaultQuantity

          return (
            <div key={index}>
              <div className="name-price">
                {ingredient.name} {`$${ingredient.price}  `}
              </div>

              <div className="default-quantity">
                推薦 {defaultQuantity} {ingredient.unit}
              </div>

              <label className="customize-quantity">
                <button
                  onClick={minusOnClick}
                  name={ingredient.id.toString()}
                  disabled={isOutOfStock || parseInt(ingredientQuantity) === 0}
                >
                  <FaMinus
                    size="15px"
                    fill={
                      isOutOfStock || parseInt(ingredientQuantity) === 0
                        ? '#e8ebf0'
                        : '#fbd779'
                    }
                  />
                </button>
                <input
                  name={`ingredient.${ingredient.id}.customizeQuantity`}
                  type="text"
                  value={ingredientQuantity}
                  onChange={inputOnChange}
                  disabled={isOutOfStock}
                />
                <button
                  onClick={addOnClick}
                  name={ingredient.id.toString()}
                  disabled={isOutOfStock || parseInt(ingredientQuantity) === 20}
                >
                  <FaPlus
                    size="15px"
                    fill={
                      isOutOfStock || parseInt(ingredientQuantity) === 20
                        ? '#e8ebf0'
                        : '#fbd779'
                    }
                  />
                </button>
              </label>

              {isOutOfStock && (
                <label className="error-msg no-stock">目前無存貨</label>
              )}
              {errors.ingredient && (
                <label className="error-msg">
                  {errors.ingredient[ingredient.id]?.customizeQuantity}
                </label>
              )}
            </div>
          )
        })}
      </div>
    </Col>
  )
}

IngredientsAdjuster.propTypes = {
  categoryName: PropTypes.string.isRequired,
  categoryIngredients: PropTypes.array.isRequired,
  outOfStockIngredients: PropTypes.array.isRequired,
  handmadePrice: PropTypes.number,
  passPriceToAdder: PropTypes.func,
}

export default IngredientsAdjuster
