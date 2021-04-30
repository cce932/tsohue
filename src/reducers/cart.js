import {
  DELETE_CART_ITEM,
  LOAD_CART_SUCCESS,
  SET_CART_IDS,
  SET_CART_SUM,
} from "pages/ShoppingCart/constant"
import { useReducer } from "react"

const cartReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case LOAD_CART_SUCCESS:
      return {
        ...state,
        data: payload,
      }
    case SET_CART_IDS:
      return {
        ...state,
        ids: payload,
      }
    case SET_CART_SUM:
      return {
        ...state,
        originalSum: payload,
      }
    case DELETE_CART_ITEM:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== payload),
      }
    default:
  }
}

const initialState = {
  data: [],
  ids: [],
  originalSum: 0,
  lightData: [],
}

const useCartreducer = () => useReducer(cartReducer, initialState)

export default useCartreducer