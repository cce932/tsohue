import React, { useEffect } from 'react'
import { Field, Formik } from 'formik'
import { Form, Spinner } from 'react-bootstrap'

import 'shared/style/shoppingCart.scss'
import CartItem from './CartItem'
import LoadService from 'services/load.service'
import { createDispatch } from 'shared/utility/hooks'
import useCartreducer from 'reducers/cart'
import { LOAD_CART, SET_CART_IDS, SET_CART_SUM } from './constant'
import { allPaths, order } from 'shared/constants/pathName'
import Empty from 'shared/components/Empty'

const ShoppingCart = () => {
  const [state, dispatch] = useCartreducer()
  const { originalSum, ids, data, updatingCart } = state
  const cartDispatch = createDispatch(dispatch)

  useEffect(() => {
    LoadService.loadCart()
      .then(({ data }) => {
        cartDispatch(LOAD_CART, data)

        const _cartIds = []
        let _cartSum = 0
        for (const cart of data) {
          _cartIds.push(cart.id.toString())
          _cartSum += cart.sum
        }
        cartDispatch(SET_CART_IDS, _cartIds)
        cartDispatch(SET_CART_SUM, _cartSum)
      })
      .catch(() => {
        cartDispatch(LOAD_CART, [])
      })
  }, [dispatch])

  const selectAllOnChange = (values, setFieldValue) => () => {
    const isSelectAll = values.selectAll
    setFieldValue('selectAll', !isSelectAll)
    setFieldValue('checked', isSelectAll ? [] : ids)
    setFieldValue('currentSum', isSelectAll ? 0 : originalSum)
  }

  return (
    <div className="container cart pages">
      {typeof data !== 'string' &&
      data.length > 0
        ? (<>
          <div className="title">購物車</div>
          <Formik
            initialValues={{ checked: [], selectAll: false, currentSum: 0 }}
            onSubmit={(values) => {
              if (values.checked.length) {
                window.location = `${
                  allPaths[order]
                }?cartIds=${values.checked.join('_')}`
              } else {
                window.alert('請至少勾選一個烹飪包喔')
              }
            }}
          >
            {({ values, handleSubmit, setFieldValue }) => (
              <Form>
                <div role="group">
                  {data.map((item) => (
                    <CartItem
                      key={item.id}
                      {...{
                        cartId: item.id.toString(),
                        recipe: item.recipe,
                        customize: item.customize,
                        sum: item.sum,
                        recipeImage: item.recipeImage,
                        isCustomize: item.isCustomize,
                        reactDispatch: cartDispatch,
                        ids: ids,
                        updatingCart,
                      }}
                    />
                  ))}
                </div>
                {/* For aligning with the rwd block of items, container is added */}
                <div className="bottom container" id="cart-bottom">
                  <div className="float">
                    <div className="select-all">
                      <Field
                        className="styled-checkbox"
                        type="checkbox"
                        name="selectAll"
                        id="styled-checkbox-select-all" // In formik, single checkbox don't need "value", but checkbox group need.
                        onChange={selectAllOnChange(values, setFieldValue)}
                      />
                      <label htmlFor="styled-checkbox-select-all">全選</label>
                    </div>

                    <div className="total">
                      <span>
                        共 {values.checked.length} 項&ensp;&ensp;總額NT.{values.currentSum}
                      </span>
                    </div>
                    <div className="order-btn">
                      <button type="submit" onClick={handleSubmit}>
                        訂購
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </>
          )
        : typeof data === 'string'
          ? (
        <Empty message={data} />
            )
          : (
        <Spinner animation="border" variant="warning" role="status" />
            )}
    </div>
  )
}

export default ShoppingCart
