import LoadService from "services/load.service"
import { extractErrorMsg } from "shared/utility/common"
import { setMessage } from "./message"
import { LOAD_RECIPES_SUCCESS } from "./types"

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