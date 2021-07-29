import React, { useEffect } from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { Form, Field, Formik } from 'formik'
import { Spinner, Form as BsForm, Col, Row } from 'react-bootstrap'

import 'shared/style/order.scss'
import OrderedRecipe from 'shared/components/OrderedRecipe'
import useCartreducer from 'reducers/order'
import loadService from 'services/load.service'
import { LOAD_CART, SET_SUM, SUBMIT_START, SUBMIT_END } from './constant'
import { createDispatch } from 'shared/utility/hooks'
import { allPaths, shoppingCart } from 'shared/constants/pathName'
import { createOrder } from 'actions/add'
import { payWayOptions, serviceWayOptions } from 'shared/constants/options'

const Order = () => {
  const reduxDispatch = useDispatch()
  const [state, dispatch] = useCartreducer()
  const orderDispatch = createDispatch(dispatch)
  const { data, sum, submitting } = state
  const cartIds = new URL(window.location.href).searchParams
    .get('cartIds')
    .split('_')

  useEffect(() => {
    cartIds.forEach((id) => {
      loadService.loadCartById(id).then(({ data }) => {
        orderDispatch(LOAD_CART, data)
        orderDispatch(SET_SUM, data.sum)
      })
    })
  }, [])

  return (
    <div className="container order pages">
      <div className="title">結帳</div>
      <div role="group">
        {data.length === cartIds.length
          ? (
              data.map((item) => (
            <OrderedRecipe
              key={item.id}
              {...{
                cartId: item.id,
                recipe: item.recipe,
                customize: item.customize,
                sum: item.sum,
                recipeImage: item.recipeImage,
                isCustomize: item.isCustomize,
                modifiable: false,
              }}
            />
              ))
            )
          : (
          <Spinner
            size="lg"
            animation="border"
            variant="warning"
            role="status"
          />
            )}
      </div>
      <Formik
        initialValues={{
          discount: 0,
          payWay: 'cashOnDelivery',
          serviceWay: 'homeDelivery',
          address: '',
          hopeDeliverTime: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
          transportFee: 60,
        }}
        onSubmit={(values) => {
          orderDispatch(SUBMIT_START)
          const {
            discount,
            payWay,
            serviceWay,
            address,
            hopeDeliverTime,
            transportFee,
          } = values

          const carts = data.map((cart) => ({
            cartId: cart.id,
            cartSum: cart.sum,
          }))

          const orderData = {
            carts,
            discount,
            payWay,
            serviceWay,
            address,
            hopeDeliverTime: moment(hopeDeliverTime).toISOString(),
            transportFee,
            sum, // value from react reducer
          }

          reduxDispatch(createOrder(orderData)).then((data) => {
            window.location = `${allPaths.orderSuccess}?id=${data.id}&number=${data.orderNumber}`
            orderDispatch(SUBMIT_END)
          })
        }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <Row xs="1" md="2" className="info">
              <Col className="left">
                <div className="block">
                  <label htmlFor="discount">折價券</label>
                  <BsForm.Select id="discount" name="discount" onChange={handleChange}>
                    <option value="0">目前無任何折價券</option>
                  </BsForm.Select>
                </div>

                <div className="block">
                  <label htmlFor="payWay">付款方式</label>
                  <BsForm.Select id="payWay" name="payWay" onChange={handleChange}>
                    {Object.keys(payWayOptions).map((option) => (
                      <option key={option} value={option}>{payWayOptions[option]}</option>
                    ))}
                  </BsForm.Select>
                </div>

                <div className="block">
                  <label htmlFor="serviceWay">配送方式</label>
                  <BsForm.Select id="serviceWay" name="serviceWay" onChange={handleChange}>
                    {Object.keys(serviceWayOptions).map((option) => (
                      <option key={option} value={option}>
                        {serviceWayOptions[option]}
                      </option>
                    ))}
                  </BsForm.Select>
                </div>

                <div className="block">
                  <label htmlFor="address">地址</label>
                  <Field id="address" name="address" />
                </div>
                <div className="block">
                  <label htmlFor="hopeDeliverTime">送達時間</label>
                  <input
                    id="hopeDeliverTime"
                    name="hopeDeliverTime"
                    label="Next appointment"
                    type="datetime-local"
                    value={values.hopeDeliverTime}
                    onChange={handleChange}
                  />
                </div>
              </Col>

              <Col className="right">
                <div className="block">
                  <label htmlFor="transportFee">運費總額</label>
                  <label id="transportFee" name="transportFee">
                    NT$ {values.transportFee}
                  </label>
                </div>

                <div className="block">
                  <label htmlFor="sum">商品總額</label>
                  <label id="sum" name="sum">
                    NT$ {sum}
                  </label>
                </div>

                <div className="block">
                  <label htmlFor="paySum">付款總額</label>
                  <label id="paySum">NT$ {values.transportFee + sum}</label>
                </div>

                <div className="bottom">
                  <button
                    onClick={() => (window.location = allPaths[shoppingCart])}
                    className="return-to-cart"
                  >
                    回購物車
                  </button>
                  <button type="submit" disabled={submitting}>
                    {submitting
                      ? (
                        <Spinner animation="border" size="sm" />
                        )
                      : (
                          '下訂單'
                        )}
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Order
