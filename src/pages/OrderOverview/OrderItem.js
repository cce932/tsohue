import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import moment from 'moment'

import 'shared/style/orderItem.scss'
import OrderedRecipe from 'shared/components/OrderedRecipe'
import { SolidBtn } from 'shared/components/styled'
import { cancelOrderItem } from 'actions/edit'
import { orderStatusOptions, STATUS_TO_CONFIRM } from 'shared/constants/options'
import { allPaths, orderDetail } from 'shared/constants/pathName'
import color from 'shared/style/color'

const OrderItem = ({ orderNumber, id, status, orderTime, sum, transportFee, orderItems }) => {
  const dispatch = useDispatch()
  const toOrderDetail = (id) => () => {
    window.location = allPaths[orderDetail] + id
  }

  const cancelOrderOnClick = (id) => () => {
    dispatch(cancelOrderItem(id)).then((data) => {
      window.alert(
        `已成功刪除訂單 [編號: ${orderNumber}]，可至 [已取消] 標籤查看`,
      )
    })
  }

  return (
    <div className="order-item">
      <label className="left">
        <button className="item-number" onClick={toOrderDetail(id)}>
          {orderNumber}
        </button>
        <span className="status">{orderStatusOptions[status]}</span>
      </label>
      <label className="right">
        <label>{moment(orderTime).format('YYYY-MM-DD HH:mm')}</label>
        <label className="sum">NT. {sum + transportFee}</label>
      </label>
      {orderItems.map((item) => (
        <OrderedRecipe
          key={item.id}
          {...{
            cartId: item.id,
            recipe: item.recipe,
            customize: item.customize,
            sum: item.itemPrice,
            recipeImage: item.recipeImage,
            isCustomize: item.isCustomize,
            modifiable: false,
          }}
        />
      ))}

      <div className="tools">
        <SolidBtn
          backgroundColor={
            status === STATUS_TO_CONFIRM ? color.secondary : color.fifth
          }
          disabled={status !== STATUS_TO_CONFIRM}
          margin="0"
          onClick={cancelOrderOnClick(id)}
        >
          取消訂單
        </SolidBtn>
      </div>
    </div>
  )
}

OrderItem.propTypes = {
  orderNumber: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  orderTime: PropTypes.string.isRequired,
  sum: PropTypes.number.isRequired,
  transportFee: PropTypes.number.isRequired,
  orderItems: PropTypes.array.isRequired,
}

export default OrderItem
