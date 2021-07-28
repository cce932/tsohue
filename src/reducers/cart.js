import _ from 'lodash'
import {
  DELETE_CART_ITEM,
  LOAD_CART,
  SET_CART_IDS,
  SET_CART_SUM,
  UPDATE_CART_ITEM_END,
  UPDATE_CART_ITEM,
  UPDATE_CART_ITEM_START,
} from 'pages/ShoppingCart/constant'
import { useReducer } from 'react'

const EMPTY_CART_MESSAGE = '你的購物車還是空的喔'

const cartReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case LOAD_CART:
      return {
        ...state,
        data: payload.length ? payload : EMPTY_CART_MESSAGE,
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
    case DELETE_CART_ITEM: {
      const deletedData = state.data.filter(
        (item) => item.id.toString() !== payload,
      )
      return {
        ...state,
        data: deletedData.length ? deletedData : EMPTY_CART_MESSAGE,
      }
    }
    case UPDATE_CART_ITEM_START:
      return {
        ...state,
        updatingCart: [...state.updatingCart, payload],
      }
    case UPDATE_CART_ITEM: {
      const data = state.data
      data[_.findIndex(data, { id: payload.id })] = payload

      return {
        ...state,
        data,
      }
    }
    case UPDATE_CART_ITEM_END:
      return {
        ...state,
        updatingCart: state.updatingCart.filter((item) => item !== payload),
      }
    default:
  }
}

const initialState = {
  data: [],
  ids: [],
  originalSum: 0,
  updatingCart: [],
}

const useCartreducer = () => useReducer(cartReducer, initialState)

export default useCartreducer
