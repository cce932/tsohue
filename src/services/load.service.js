import { rootAxios } from "shared/constants/urls"

const loadRecipes = () => rootAxios.get("/recipe/overview")

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  loadRecipes,
}
