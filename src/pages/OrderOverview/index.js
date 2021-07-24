import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner, Tabs, Tab } from 'react-bootstrap'

import 'shared/style/orderOverview.scss'
import OrderItem from './OrderItem'
import Empty from 'shared/components/Empty'
import { loadAllOrders } from 'actions/load'
import { splitOrdersByStatus } from 'shared/utility/common'
import {
  orderStatusOptions,
  STATUS_ALL,
  STATUS_TO_CONFIRM,
  STATUS_TO_DELIVER,
  STATUS_FINISH,
  STATUS_CANCELED,
} from 'shared/constants/options'

const OrderOverview = () => {
  const { allOrders } = useSelector((state) => state.orderOverview)
  const splitAllOrders = splitOrdersByStatus(allOrders)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadAllOrders())
  }, [dispatch])

  return (
    <div className="order-overview">
      {typeof allOrders === 'object'
        ? (
            allOrders.length > 0
              ? (
          <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
            <Tab eventKey={STATUS_ALL} title="全部">
              {splitAllOrders[STATUS_ALL].map((order) => (
                <OrderItem key={order.id} data={order} />
              ))}
            </Tab>
            <Tab eventKey={STATUS_TO_CONFIRM} title="待確認">
              {splitAllOrders[STATUS_TO_CONFIRM].length > 0
                ? (
                    splitAllOrders[STATUS_TO_CONFIRM].map((order) => (
                  <OrderItem key={order.id} data={order} />
                    ))
                  )
                : (
                <Empty
                  message={`目前沒有${orderStatusOptions[STATUS_TO_CONFIRM]}的訂單喔`}
                />
                  )}
            </Tab>
            <Tab eventKey={STATUS_TO_DELIVER} title="待配送">
              {splitAllOrders[STATUS_TO_DELIVER].length > 0
                ? (
                    splitAllOrders[STATUS_TO_DELIVER].map((order) => (
                  <OrderItem key={order.id} data={order} />
                    ))
                  )
                : (
                <Empty
                  message={`目前沒有${orderStatusOptions[STATUS_TO_DELIVER]}的訂單喔`}
                />
                  )}
            </Tab>
            <Tab eventKey={STATUS_FINISH} title="已完成">
              {splitAllOrders[STATUS_FINISH].length > 0
                ? (
                    splitAllOrders[STATUS_FINISH].map((order) => (
                  <OrderItem key={order.id} data={order} />
                    ))
                  )
                : (
                <Empty
                  message={`目前沒有${orderStatusOptions[STATUS_FINISH]}的訂單喔`}
                />
                  )}
            </Tab>
            <Tab eventKey={STATUS_CANCELED} title="已取消">
              {splitAllOrders[STATUS_CANCELED].length > 0
                ? (
                    splitAllOrders[STATUS_CANCELED].map((order) => (
                  <OrderItem key={order.id} data={order} />
                    ))
                  )
                : (
                <Empty
                  message={`目前沒有${orderStatusOptions[STATUS_CANCELED]}的訂單喔`}
                />
                  )}
            </Tab>
          </Tabs>
                )
              : (
          <Spinner animation="border" variant="warning" role="status" />
                )
          )
        : (
        <Empty message={allOrders} />
          )}
    </div>
  )
}

export default OrderOverview
