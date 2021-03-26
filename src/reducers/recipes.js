import { LOAD_RECIPES_SUCCESS } from "actions/types"

const initialState = {}

const recipes = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOAD_RECIPES_SUCCESS:
      return { allRecipes: payload }
    default:
      return state
  }
}

export default recipes
