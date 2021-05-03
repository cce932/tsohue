import CreateService from "services/add.service"
import { extractErrorMsg } from "shared/utility/common"
import { setMessage } from "./message"
import { CREATE_CART_SUCCESS } from "./types"

export const addCartForDefault = (recipeId) => (dispatch) => {
  return CreateService.addCartForDefault(recipeId)
    .then(({ data }) => {
      dispatch({
        type: CREATE_CART_SUCCESS,
        payload: null,
      })

      return Promise.resolve(data)
    })
    .catch((error) => {
      const message = extractErrorMsg(error)
      dispatch(setMessage(message))
      return Promise.reject(message)
    })
}

export const addCartForCustomization = (cartData) => (dispatch) => {
  return CreateService.addCartForCustomization(cartData)
    .then(({ data }) => {
      dispatch({
        type: CREATE_CART_SUCCESS,
        payload: null,
      })

      return Promise.resolve(data)
    })
    .catch((error) => {
      const message = extractErrorMsg(error)
      dispatch(setMessage(message))
      return Promise.reject(message)
    })
}

export const createOrder = (orderData) => (dispatch) => {
  return CreateService.createOrder(orderData)
    .then(({ data }) => data)
    .catch((error) => {
      const message = extractErrorMsg(error)
      dispatch(setMessage(message))
      return Promise.reject(message)
    })
}
