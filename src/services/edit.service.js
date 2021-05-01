import { rootAxios } from "shared/constants/endPoint"
import authHeader from "./auth-header"

const deleteCartItem = (cartId) =>
  rootAxios.delete(`/cart/delete/${cartId}`, { headers: authHeader() })

const editCartItem = (cartId, body) =>
  rootAxios.patch(
    `/cart/update/${cartId}`,
    { ...body },
    { headers: authHeader() }
  )

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  deleteCartItem,
  editCartItem,
}
