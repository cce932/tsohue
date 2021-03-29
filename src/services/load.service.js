import { rootAxios } from "shared/constants/urls"

const loadRecipes = () => rootAxios.get("/recipe/overview")

const loadRecipeById = (id) => rootAxios.get(`/recipe/version/${id}`)

const loadRecipeImagesById = (id) => rootAxios.get(`/recipe/images/all/${id}`)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  loadRecipes,
  loadRecipeById,
  loadRecipeImagesById,
}
