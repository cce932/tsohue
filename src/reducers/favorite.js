import {
  LOAD_FAVORITY_SUCCESS,
} from 'actions/types'

const initialState = {
  allFavorites: [],
}

const favorite = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOAD_FAVORITY_SUCCESS:
      return { allFavorites: payload }
    default:
      return state
  }
}

export default favorite
