import { rootAxios } from "shared/constants/endPoint"
import authHeader from "./auth-header"

const loadRecipes = () => rootAxios.get("/recipe/overview")

const loadRecipeById = (id) => rootAxios.get(`/recipe/version/${id}`)

const loadRecipeImagesById = (id) => rootAxios.get(`/recipe/images/all/${id}`)

const loadCart = (token = authHeader()) =>
  rootAxios.get(`/cart/all`, { headers: token })

const loadCartById = (id, token = authHeader()) =>
  rootAxios.get(`/cart/get/${id}`, { headers: token })

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  loadRecipes,
  loadRecipeById,
  loadRecipeImagesById,
  loadCart,
  loadCartById,
}
