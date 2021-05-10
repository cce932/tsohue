import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Spinner, Tabs, Tab } from "react-bootstrap"

import "shared/style/orderOverview.scss"
import { loadAllOrders } from "actions/load"
import { splitOrdersByStatus } from "shared/utility/common"
import OrderItem from "./OrderItem"
import {
  orderStatusOptions,
  STATUS_ALL,
  STATUS_FINISH,
  STATUS_TO_CONFIRM,
  STATUS_TO_DELIVER,
} from "shared/constants/options"
import Empty from "shared/components/Empty"

const OrderOverview = () => {
  const dispatch = useDispatch()
  const [orders, setOrders] = useState({})

  useEffect(() => {
    dispatch(loadAllOrders())
      .then((data) => {
        setOrders(splitOrdersByStatus(data))
      })
      .catch(() => {
        setOrders("目前沒有訂單喔")
      })
  }, [dispatch])

  return (
    <div className="order-overview">
      {typeof orders === "object" ? (
        orders.all?.length > 0 ? (
          <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
            <Tab eventKey={STATUS_ALL} title="全部">
              {orders[STATUS_ALL].map((order) => (
                <OrderItem data={order} />
              ))}
            </Tab>
            <Tab eventKey={STATUS_TO_CONFIRM} title="待確認">
              {orders[STATUS_TO_CONFIRM].length > 0 ? (
                orders[STATUS_TO_CONFIRM].map((order) => (
                  <OrderItem data={order} />
                ))
              ) : (
                <Empty
                  message={`目前沒有${orderStatusOptions[STATUS_TO_CONFIRM]}的訂單喔`}
                />
              )}
            </Tab>
            <Tab eventKey={STATUS_TO_DELIVER} title="待配送">
              {orders[STATUS_TO_DELIVER].length > 0 ? (
                orders[STATUS_TO_DELIVER].map((order) => (
                  <OrderItem data={order} />
                ))
              ) : (
                <Empty
                  message={`目前沒有${orderStatusOptions[STATUS_TO_DELIVER]}的訂單喔`}
                />
              )}
            </Tab>
            <Tab eventKey={STATUS_FINISH} title="已完成">
              {orders[STATUS_FINISH].length > 0 ? (
                orders[STATUS_FINISH].map((order) => <OrderItem data={order} />)
              ) : (
                <Empty
                  message={`目前沒有${orderStatusOptions[STATUS_FINISH]}的訂單喔`}
                />
              )}
            </Tab>
          </Tabs>
        ) : (
          <Spinner animation="border" variant="warning" role="status" />
        )
      ) : (
        <Empty message={orders} />
      )}
    </div>
  )
}

export default OrderOverview
