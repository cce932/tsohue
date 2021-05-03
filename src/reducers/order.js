import { LOAD_CART, SET_SUM } from "pages/Order/constant"
import { useReducer } from "react"

const orderReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case LOAD_CART:
      return {
        ...state,
        data: [...state.data, payload],
      }
    case SET_SUM:
      console.log(state.sum)
      return {
        ...state,
        sum: state.sum + payload,
      }
    default:
      return state
  }
}

const initialState = {
  data: [],
  sum: 0,
}

const useOrderReducer = () => useReducer(orderReducer, initialState)

export default useOrderReducer
