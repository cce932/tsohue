import CreateService from 'services/add.service'
import { extractErrorMsg } from 'shared/utility/common'
import { setMessage } from './message'
import { ADD_MY_FAVORITY_SUCCESS, CREATE_CART_SUCCESS } from './types'

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

export const addFavorite = (id) => (dispatch) => {
  return CreateService.addFavorite(id)
    .then(({ data }) => {
      dispatch({
        type: ADD_MY_FAVORITY_SUCCESS,
        payload: { id },
      })

      return Promise.resolve(data)
    })
    .catch((error) => {
      const message = extractErrorMsg(error)
      dispatch(setMessage(message))
      return Promise.reject(message)
    })
}
