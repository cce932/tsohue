import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Spinner, Row, Col } from 'react-bootstrap'
import _ from 'lodash'
import moment from 'moment'
import { BsChevronLeft } from 'react-icons/bs'

import 'shared/style/orderDetail.scss'
import Empty from 'shared/components/Empty'
import OrderItem from './OrderOverview/OrderItem'
import color from 'shared/style/color'
import { loadOrderById } from 'actions/load'
import { payWayOptions, serviceWayOptions } from 'shared/constants/options'
import { useParams } from 'react-router-dom'

const OrderDetail = () => {
  const dispatch = useDispatch()
  const [order, setOrder] = useState({})
  const { id: orderId } = useParams()

  useEffect(() => {
    dispatch(loadOrderById(orderId))
      .then((data) => {
        setOrder(data)
      })
      .catch(() => {
        setOrder('訂單不存在喔')
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
      {!_.isEmpty(order)
        ? (
            typeof order === 'object'
              ? (
          <>
            <OrderItem {...{ ...order }} />
            <Row xs="1" md="2" className="info">
              <Col>
                <table className="left">
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>付款方式</td>
                      <td>{payWayOptions[order.payWay]}</td>
                    </tr>

                    <tr>
                      <td>配送方式</td>
                      <td>
                        {serviceWayOptions[order.serviceWay]}
                      </td>
                    </tr>

                    <tr>
                      <td>地址</td>
                      <td>{order.address}</td>
                    </tr>

                    <tr>
                      <td>預期送達時間</td>
                      <td>
                        {moment(order.hopeDeliverTime).format('YYYY-MM-DD HH:mm')}
                      </td>
                    </tr>

                    <tr>
                      <td>寄出時間</td>
                      <td>
                        {order.shippingTime
                          ? moment(order.shippingTime).format('YYYY-MM-DD HH:mm')
                          : '尚未寄出'}
                      </td>
                    </tr>

                    <tr>
                      <td>實際送達時間</td>
                      <td>
                        {order.realDeliverTime
                          ? moment(order.realDeliverTime).format('YYYY-MM-DD HH:mm')
                          : '尚未抵達'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>

              <Col>
                <table className="right">
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>運費總額</td>
                      <td>
                        {order.transportFee}
                      </td>
                    </tr>

                    <tr>
                      <td>商品總額</td>
                      <td>{order.sum}</td>
                    </tr>

                    <tr>
                      <td>折抵金額</td>
                      <td>-{order.discount}</td>
                    </tr>

                    <tr><td>&ensp;</td></tr>
                    <tr><td>&ensp;</td></tr>

                    <tr>
                      <td>付款總額</td>
                      <td id="paySum">
                        NT$ {order.transportFee + order.sum}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </>
                )
              : (
          <Empty message={order} />
                )
          )
        : (
        <Spinner animation="border" variant="warning" role="status" />
          )}
    </div>
  )
}

export default OrderDetail
