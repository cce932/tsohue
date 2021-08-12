import EditService from 'services/edit.service'
import { extractErrorMsg } from 'shared/utility/common'
import { setMessage } from './message'
import { CANCEL_ORDER_ITEM_SUCCESS, REMOVE_FAVORITY_SUCCESS } from './types'

export const cancelOrderItem = (id) => (dispatch) => {
  return EditService.cancelOrderItem(id)
    .then(({ data }) => {
      dispatch({
        type: CANCEL_ORDER_ITEM_SUCCESS,
        payload: data.id,
      })

      return Promise.resolve(data)
    })
    .catch((error) => {
      const message = extractErrorMsg(error)
      dispatch(setMessage(message))
      return Promise.reject(message)
    })
}

export const removeFavorite = (id) => (dispatch) => {
  return EditService.removeFavorite(id)
    .then(({ data }) => {
      dispatch({
        type: REMOVE_FAVORITY_SUCCESS,
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
