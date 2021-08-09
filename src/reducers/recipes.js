import { LOAD_RECIPES_SUCCESS, ADD_MY_FAVORITY_SUCCESS, REMOVE_MY_FAVORITY_SUCCESS } from 'actions/types'

const initialState = {}

const recipes = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOAD_RECIPES_SUCCESS:
      return { allRecipes: payload }
    case ADD_MY_FAVORITY_SUCCESS: {
      const { id } = payload
      return state.map(recipe => {
        if (recipe.id === id) {
          return { ...recipe, like: recipe.like + 1 }
        }
        return recipe
      }) }
    case REMOVE_MY_FAVORITY_SUCCESS: {
      const { id } = payload
      return state.map(recipe => {
        if (recipe.id === id) {
          return { ...recipe, like: recipe.like - 1 }
        }
        return recipe
      }) }
    default:
      return state
  }
}

export default recipes
