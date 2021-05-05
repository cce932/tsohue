import React from "react"
import moment from "moment"

import "shared/style/orderItem.scss"
import { orderStatusOptions } from "shared/constants/options"
import OrderedRecipe from "shared/components/OrderedRecipe"

const OrderItem = ({ data }) => {
  return (
    <div className="order-item">
      <label className="left">
        <label className="item-number">{data.orderNumber}</label>
        <label>{orderStatusOptions[data.status]}</label>
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
            isCustomize: false, // TODO: change to `item.isCustomze`, waiting for api
            modifiable: false,
          }}
        />
      ))}
    </div>
  )
}

export default OrderItem
