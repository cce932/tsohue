import { rootAxios } from 'shared/constants/endPoint'
import authHeader from './auth-header'

const deleteCartItem = (cartId) =>
  rootAxios.delete(`/cart/delete/${cartId}`, { headers: authHeader() })

const editCartItem = (cartId, body) =>
  rootAxios.patch(
    `/cart/update/${cartId}`,
    { ...body },
    { headers: authHeader() },
  )

const cancelOrderItem = (id) =>
  rootAxios.patch(`/order/update/member/${id}`, {}, { headers: authHeader() })

const removeFavorite = (id) =>
  rootAxios.delete(`/myFavorite/remove/${id}`, { headers: authHeader() })

export default {
  deleteCartItem,
  editCartItem,
  cancelOrderItem,
  removeFavorite,
}
