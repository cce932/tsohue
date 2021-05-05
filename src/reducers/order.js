import {
  LOAD_CART,
  SET_SUM,
  SUBMIT_END,
  SUBMIT_START,
} from "pages/Order/constant"
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
      return {
        ...state,
        sum: state.sum + payload,
      }
    case SUBMIT_START:
      return {
        ...state,
        submitting: true,
      }
    case SUBMIT_END:
      return {
        ...state,
        submitting: false,
      }
    default:
      return state
  }
}

const initialState = {
  data: [],
  sum: 0,
  submitting: false,
}

const useOrderReducer = () => useReducer(orderReducer, initialState)

export default useOrderReducer
