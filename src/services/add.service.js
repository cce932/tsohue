import { rootAxios } from "shared/constants/endPoint"
import authHeader from "services/auth-header"

const addCart = (cartData) =>
  rootAxios.post("/cart/add", cartData, { headers: authHeader() })

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addCart,
}
