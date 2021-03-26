import LoadService from "services/load.service"
import { LOAD_RECIPES_SUCCESS } from "./types"

export const loadRecipes = () => (dispatch) => {
  return LoadService.loadRecipes().then(({ data }) => {
    dispatch({
      type: LOAD_RECIPES_SUCCESS,
      payload: data,
    })

    return Promise.resolve(data)
  })
}
