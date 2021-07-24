import {
  CANCEL_ORDER_ITEM_SUCCESS,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_FAILURE,
} from 'actions/types'

import { STATUS_CANCELED } from 'shared/constants/options'

const initialState = {
  allOrders: [],
}

const orderOverview = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOAD_ORDERS_SUCCESS:
      return { allOrders: payload }
    case LOAD_ORDERS_FAILURE:
      return {
        allOrders: payload,
      }
    case CANCEL_ORDER_ITEM_SUCCESS:
      return {
        allOrders: state.allOrders.map((order) => {
          return order.id === payload
            ? { ...order, status: STATUS_CANCELED }
            : order
        }),
      }
    default:
      return state
  }
}

export default orderOverview
