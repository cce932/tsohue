import _ from 'lodash'

import LoadService from 'services/load.service'
import { extractErrorMsg } from 'shared/utility/common'
import { setMessage } from './message'
import {
  LOAD_ORDERS_SUCCESS,
  LOAD_RECIPES_SUCCESS,
  LOAD_ORDERS_FAILURE,
  LOAD_FAVORITY_SUCCESS,
} from './types'

export const loadRecipes = () => (dispatch) => {
  return LoadService.loadRecipes()
    .then(({ data }) => {
      dispatch({
        type: LOAD_RECIPES_SUCCESS,
        payload: data,
      })

      return Promise.resolve(data)
    })
    .catch((error) => {
      const message = extractErrorMsg(error)
      dispatch(setMessage(message))
      return Promise.reject(message)
    })
}

export const loadRecipeById = (id) => (dispatch) => {
  return LoadService.loadRecipeById(id)
    .then(({ data }) => {
      return Promise.resolve(data)
    })
    .catch((error) => {
      const message = extractErrorMsg(error)
      dispatch(setMessage(message))
      return Promise.reject(message)
    })
}

export const loadRecipeImagesById = (id) => (dispatch) => {
  return LoadService.loadRecipeImagesById(id)
    .then(({ data }) => Promise.resolve(data))
    .catch((error) => {
      const message = extractErrorMsg(error)
      dispatch(setMessage(message))
      return Promise.reject(message)
    })
}

// export const loadCart = () => (dispatch) => {
//   return LoadService.loadCart()
//     .then(({ data }) => {
//       dispatch({
//         type: LOAD_CART_SUCCESS,
//         payload: data,
//       })
//       return Promise.resolve(data)
//     })
//     .catch((error) => {
//       const message = extractErrorMsg(error)
//       dispatch(setMessage({...message, next: allPaths[shoppingCart].slice(1)}))
//       return Promise.reject(message)
//     })
// }

export const loadAllOrders = () => (dispatch) => {
  return LoadService.loadAllOrders()
    .then(({ data }) => {
      dispatch({
        type: LOAD_ORDERS_SUCCESS,
        payload: _.reverse(data),
      })
    })
    .catch((error) => {
      const message = extractErrorMsg(error)

      dispatch({
        type: LOAD_ORDERS_FAILURE,
        payload: '目前沒有訂單喔',
      })
      dispatch(setMessage(message))

      return Promise.reject(message)
    })
}

export const loadOrderById = (id) => (dispatch) => {
  return LoadService.loadOrderById(id)
    .then(({ data }) => Promise.resolve(data))
    .catch((error) => {
      const message = extractErrorMsg(error)
      dispatch(setMessage(message))
      return Promise.reject(message)
    })
}

export const loadFavorite = () => (dispatch) => {
  return LoadService.loadFavorite().then(({ data }) => {
    dispatch({
      type: LOAD_FAVORITY_SUCCESS,
      payload: data,
    })
  }).catch((error) => {
    const message = extractErrorMsg(error)
    dispatch(setMessage(message))
    return Promise.reject(message)
  })
}
