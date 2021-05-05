import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Spinner } from "react-bootstrap"
import _ from "lodash"
import moment from "moment"
import { BsChevronLeft } from "react-icons/bs"

import "shared/style/orderDetail.scss"
import Empty from "shared/components/Empty"
import OrderItem from "./OrderOverview/OrderItem"
import color from "shared/style/color"
import { loadOrderById } from "actions/load"
import { payWayOptions, serviceWayOptions } from "shared/constants/options"

const OrderDetail = (props) => {
  const dispatch = useDispatch()
  const [order, setOrder] = useState({})
  const orderId = props.match.params.id

  useEffect(() => {
    dispatch(loadOrderById(orderId))
      .then((data) => {
        setOrder(data)
      })
      .catch(() => {
        setOrder("訂單不存在喔")
      })
  }, [dispatch, orderId])

  return (
    <div className="container order-detail pages">
      <div className="title">
        <button onClick={() => window.history.back()}>
          <BsChevronLeft size="30px" fill={color.vice} />
        </button>
        <div>訂單詳細</div>
      </div>
      {!_.isEmpty(order) ? (
        typeof order === "object" ? (
          <>
            <OrderItem data={order} />
            <div className="flex">
              <div className="left">
                <div className="block">
                  <label className="key">付款方式</label>
                  <label className="value">{payWayOptions[order.payWay]}</label>
                </div>

                <div className="block">
                  <label className="key">配送方式</label>
                  <label className="value">
                    {serviceWayOptions[order.serviceWay]}
                  </label>
                </div>

                <div className="block">
                  <label className="key">地址</label>
                  <label className="value">{order.address}</label>
                </div>

                <div className="block">
                  <label className="key">預期送達時間</label>
                  <label className="value">
                    {moment(order.hopeDeliverTime).format("YYYY-MM-DD HH:mm")}
                  </label>
                </div>

                <div className="block">
                  <label className="key">寄出時間</label>
                  <label className="value">
                    {order.shippingTime
                      ? moment(order.shippingTime).format("YYYY-MM-DD HH:mm")
                      : "尚未寄出"}
                  </label>
                </div>

                <div className="block">
                  <label className="key">實際送達時間</label>
                  <label className="value">
                    {order.realDeliverTime
                      ? moment(order.realDeliverTime).format("YYYY-MM-DD HH:mm")
                      : "尚未抵達"}
                  </label>
                </div>
              </div>

              <div className="right">
                <div className="block">
                  <label className="key">運費總額</label>
                  <label
                    id="transportFee"
                    name="transportFee"
                    className="value"
                  >
                    {order.transportFee}
                  </label>
                </div>

                <div className="block">
                  <label className="key">商品總額</label>
                  <label className="value">{order.sum}</label>
                </div>

                <div className="block">
                  <label className="key">折抵金額</label>
                  <label className="value">-{order.discount}</label>
                </div>

                <div className="block" id="paySum">
                  <label className="key">付款總額</label>
                  <label id="paySum" className="value">
                    NT$ {order.transportFee + order.sum}
                  </label>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Empty message={order} />
        )
      ) : (
        <Spinner animation="border" variant="warning" role="status" />
      )}
    </div>
  )
}

export default OrderDetail
