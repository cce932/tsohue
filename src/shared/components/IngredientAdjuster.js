import { ErrorMessage, useFormikContext } from "formik"
import { useEffect } from "react"
import { Col } from "react-bootstrap"
import { FaPlus, FaMinus } from "react-icons/fa"

const IngredientsBlock = ({
  categoryName,
  categoryIngredients,
  outOfStockIngredients,
  handmadePrice,
  passPriceToAdder,
}) => {
  const { values, setFieldValue, handleChange, errors } = useFormikContext()

  useEffect(() => {
    passPriceToAdder(calculatePrice(values))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.ingredient, errors])

  // 1. return value of customize ingredients price =
  //    each ingredient's [price * number]
  //    + [handmadePrice]
  // 2. return value of default ingredients = -1
  const calculatePrice = (formikValues) => {
    let _price = 0
    let isDefault = true

    if (errors.ingredient?.length) return -1

    try {
      for (const formikValue of Object.values(formikValues.ingredient)) {
        if (formikValue.customizeQuantity !== formikValue.defaultQuantity) {
          isDefault = false
        }
        _price +=
          parseInt(formikValue.customizeQuantity) * parseInt(formikValue.price)
      }
    } catch (e) {
      return -1
    }

    return isDefault ? -1 : _price + parseInt(handmadePrice)
  }

  const addOnClick = (e) => {
    e.preventDefault()
    const ingredientId = e.currentTarget.name // In order to binding the each input, set the name of button with ingredient id

    setFieldValue(
      `ingredient.${ingredientId}.customizeQuantity`,
      parseInt(values.ingredient[ingredientId].customizeQuantity) + 1
    )
  }

  const minusOnClick = (e) => {
    e.preventDefault()
    const ingredientId = e.currentTarget.name

    setFieldValue(
      `ingredient.${ingredientId}.customizeQuantity`,
      parseInt(values.ingredient[ingredientId].customizeQuantity) - 1
    )
  }

  return (
    <Col>
      <p className="category">{categoryName}</p>
      <div className="ingredients-block">
        {categoryIngredients.map((splitedIngredient, index) => {
          const ingredient = splitedIngredient.ingredient
          const isOutOfStock = outOfStockIngredients.includes(
            ingredient.id.toString()
          )
          return (
            <div key={index}>
              <div className="name-price">
                {ingredient.name} {`$${ingredient.price}  `}
              </div>

              <div className="default-quantity">
                推薦 {splitedIngredient.quantityRequired} {ingredient.unit}
              </div>

              <label className="customize-quantity">
                <button
                  onClick={minusOnClick}
                  name={ingredient.id.toString()}
                  disabled={isOutOfStock}
                >
                  <FaMinus
                    size="15px"
                    fill={isOutOfStock ? "#e8ebf0" : "#fbd779"}
                  />
                </button>
                <input
                  name={`ingredient.${ingredient.id}.customizeQuantity`}
                  type="text"
                  value={values.ingredient[ingredient.id].customizeQuantity}
                  onChange={handleChange}
                  disabled={isOutOfStock}
                />
                <button
                  onClick={addOnClick}
                  name={ingredient.id.toString()}
                  disabled={isOutOfStock}
                >
                  <FaPlus
                    size="15px"
                    fill={isOutOfStock ? "#e8ebf0" : "#fbd779"}
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

export default IngredientsBlock
