import { rootAxios } from "shared/constants/endPoint"
import authHeader from "services/auth-header"

const addCartForDefault = (recipeId) =>
  rootAxios.get(`/cart/default/add/${recipeId}`, {
    headers: authHeader(),
  })

const addCartForCustomization = (cartData) =>
  rootAxios.post("/cart/customize/add", cartData, { headers: authHeader() })

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addCartForDefault,
  addCartForCustomization,
}
