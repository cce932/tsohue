import React, { useEffect } from "react"
import { Field, Formik } from "formik"
import { Form, Spinner } from "react-bootstrap"

import "shared/style/shoppingCart.scss"
import CartItem from "./CartItem"
import LoadService from "services/load.service"
import { createDispatch } from "shared/utility/hooks"
import useCartreducer from "reducers/cart"
import { LOAD_CART, SET_CART_IDS, SET_CART_SUM } from "./constant"

const ShoppingCart = () => {
  const [state, dispatch] = useCartreducer()
  const { originalSum, ids, data, updatingCart } = state
  const cartDispatch = createDispatch(dispatch)

  useEffect(() => {
    LoadService.loadCart()
      .then(({ data }) => {
        cartDispatch(LOAD_CART, data)

        let _cartIds = []
        let _cartSum = 0
        for (const cart of data) {
          _cartIds.push(cart.id.toString())
          _cartSum += cart.sum
        }
        cartDispatch(SET_CART_IDS, _cartIds)
        cartDispatch(SET_CART_SUM, _cartSum)
      })
      .catch(() => {
        cartDispatch(LOAD_CART, "你的購物車還是空的喔")
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const selectAllOnChange = (values, setFieldValue) => () => {
    const isSelectAll = values.selectAll
    setFieldValue("selectAll", !isSelectAll)
    setFieldValue("checked", isSelectAll ? [] : ids)
    setFieldValue("currentSum", isSelectAll ? 0 : originalSum)
  }

  return (
    <div className="container cart pages">
      <div className="title">購物車</div>
      {typeof data !== "string" && data.length > 0 ? (
        <Formik
          initialValues={{ checked: [], selectAll: false, currentSum: 0 }}
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          {({ values, handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <div role="group">
                {data.map((item) => (
                  <CartItem
                    key={item.id}
                    {...{
                      cartId: item.id.toString(),
                      recipe: item.recipe,
                      customize: item.customize,
                      sum: item.sum,
                      isCustomize: item.isCustomize,
                      reactDispatch: cartDispatch,
                      ids: ids,
                      updatingCart,
                    }}
                  />
                ))}
              </div>
              <div className="bottom">
                <label className="select-all">
                  <Field
                    className="styled-checkbox"
                    type="checkbox"
                    name="selectAll"
                    id="styled-checkbox-select-all" // In formik, single checkbox don't need "value", but checkbox group need.
                    onChange={selectAllOnChange(values, setFieldValue)}
                  />
                  <label htmlFor="styled-checkbox-select-all">全選</label>
                </label>
                <div className="right">
                  <span>
                    共 {values.checked.length} 項&ensp;&ensp;總額NT.
                    <span className="price">{values.currentSum}</span>
                  </span>
                  <button type="submit">訂購</button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ) : typeof data === "string" ? (
        <div className="empty-cart">
          <img src="/common-pic/emptyCart.png" alt="empty-cart" />
          <div>{data}</div>
        </div>
      ) : (
        <Spinner animation="border" variant="warning" role="status" />
      )}
    </div>
  )
}

export default ShoppingCart
