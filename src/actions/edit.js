import EditService from "services/edit.service"
import { extractErrorMsg } from "shared/utility/common"
import { setMessage } from "./message"
import { REMOVE_CART_ITEM_SUCCESS } from "./types"

// export const removeCartItem = (cartId) => (dispatch) => {
//   return EditService.removeCartItem(cartId)
//     .then(({ data }) => {
//       dispatch({
//         type: REMOVE_CART_ITEM_SUCCESS,
//         payload: null,
//       })

//       return Promise.resolve(data)
//     })
//     .catch((error) => {
//       const message = extractErrorMsg(error)
//       dispatch(setMessage(message))
//       return Promise.reject(message)
//     })
// }

