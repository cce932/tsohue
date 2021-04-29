import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import "shared/style/shoppingCart.scss"
import "shared/style/components/checkbox.scss"
import SingleCart from "./item"
import { loadCart } from "actions/load"
import { Field, Formik } from "formik"
import { Form } from "react-bootstrap"

const ShoppingCart = () => {
  const dispatch = useDispatch()
  const [cart, setCart] = useState([])
  const [lightCartData, setLightCartData] = useState({})

  useEffect(() => {
    dispatch(loadCart()).then((data) => {
      setCart(data)
      let _cartIds = []
      let _cartSum = 0
      for (const cart of data) {
        _cartIds.push(cart.id.toString())
        _cartSum += cart.sum
      }
      setLightCartData({ ids: _cartIds, allSum: _cartSum })
      console.log(_cartIds, _cartSum)
    })
  }, [dispatch])

  // const validationSchema = {}

  const selectAllOnChange = (e, values, setFieldValue) => {
    const isSelectAll = values.selectAll
    console.log("select all", isSelectAll, values)
    setFieldValue("selectAll", !isSelectAll)
    setFieldValue("checked", isSelectAll ? [] : lightCartData.ids)
    setFieldValue("currentSum", isSelectAll ? 0 : lightCartData.allSum)
  }

  return (
    <div className="container cart pages">
      <div className="title">購物車</div>
      <Formik
        initialValues={{ checked: [], selectAll: false, currentSum: 0 }}
        // validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <div role="group">
              {cart.map((item) => {
                const recipe = item.recipe
                const customize = item.customize

                return (
                  <SingleCart
                    key={item.id}
                    {...{
                      cartId: item.id,
                      recipe,
                      customize,
                      sum: item.sum,
                      isCustomize: item.isCustomize,
                    }}
                  />
                )
              })}
            </div>
            <div className="bottom">
              <label className="select-all">
                <Field
                  className="styled-checkbox"
                  type="checkbox"
                  name="selectAll"
                  id="styled-checkbox-select-all" // In formik, single checkbox don't need "value", but checkbox group need.
                  onChange={(e) => selectAllOnChange(e, values, setFieldValue)}
                />
                <label htmlFor="styled-checkbox-select-all">全選</label>
              </label>
              <div className="right">
                <span>
                  共{values.checked.length}項 總額NT.{values.currentSum}
                </span>
                <button type="submit">訂購</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ShoppingCart
