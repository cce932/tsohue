import CreateService from "services/add.service"
import { extractErrorMsg } from "shared/utility/common"
import { setMessage } from "./message"
import { CREATE_CART_SUCCESS } from "./types"

export const addCart = (cartData) => (dispatch) => {
  return CreateService.addCart(cartData)
    .then(({ data }) => {
      dispatch({
        type: CREATE_CART_SUCCESS,
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
