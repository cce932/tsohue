import React from "react"
import { useDispatch } from "react-redux"
import moment from "moment"

import "shared/style/orderItem.scss"
import OrderedRecipe from "shared/components/OrderedRecipe"
import { SolidBtn } from "shared/components/styled"
import { cancelOrderItem } from "actions/edit"
import { orderStatusOptions, STATUS_TO_CONFIRM } from "shared/constants/options"
import { allPaths, orderDetail } from "shared/constants/pathName"
import color from "shared/style/color"

const OrderItem = ({ data }) => {
  const dispatch = useDispatch()
  const toOrderDetail = (id) => () => {
    window.location = allPaths[orderDetail] + id
  }

  const cancelOrderOnClick = (id) => () => {
    dispatch(cancelOrderItem(id)).then((data) => {
      window.alert(
        `已成功刪除訂單 [編號: ${data.orderNumber}]，可至 [已取消] 標籤查看`
      )
    })
  }

  return (
    <div className="order-item">
      <label className="left">
        <button className="item-number" onClick={toOrderDetail(data.id)}>
          {data.orderNumber}
        </button>
        <span className="status">{orderStatusOptions[data.status]}</span>
      </label>
      <label className="right">
        <label>{moment(data.orderTime).format("YYYY-MM-DD HH:mm")}</label>
        <label className="sum">NT. {data.sum + data.transportFee}</label>
      </label>
      {data.orderItems.map((item) => (
        <OrderedRecipe
          key={item.id}
          {...{
            cartId: item.id,
            recipe: item.recipe,
            customize: item.customize,
            sum: item.itemPrice,
            recipeImage: item.recipeImage,
            isCustomize: item.isCustomze,
            modifiable: false,
          }}
        />
      ))}

      <div className="tools">
        <SolidBtn
          backgroundColor={
            data.status === STATUS_TO_CONFIRM ? color.secondary : color.fifth
          }
          disabled={data.status !== STATUS_TO_CONFIRM}
          margin="0"
          onClick={cancelOrderOnClick(data.id)}
        >
          取消訂單
        </SolidBtn>
      </div>
    </div>
  )
}

export default OrderItem
