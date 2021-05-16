import _ from "lodash"
import crypto from "crypto"

import {
  STATUS_ALL,
  STATUS_FINISH,
  STATUS_TO_CONFIRM,
  STATUS_TO_DELIVER,
  STATUS_CANCELED,
} from "shared/constants/options"

// 把array以maxRow為限制 分為多維陣列
export const splitToRows = (array, maxRow) => {
  const result = []
  for (const [index, value] of array.entries()) {
    let group = Math.floor(index / maxRow)
    result[group] ? result[group].push(value) : (result[group] = [value]) // 最後的[item] 注意方括號 不然會出現This method ".push" is not define        return null
  }

  return result
}

export const extractErrorMsg = (error) => {
  return (
    (error && error.response && error.response.data) ||
    error.message ||
    error.toString()
  )
}

const addPrefix = (string, pad, length) => {
  return (new Array(length + 1).join(pad) + string).slice(-length)
}

export const transMSecToMin = (totalMSec) => {
  const totalSec = _.floor(totalMSec / 1000)
  const minutes = _.floor(totalSec / 60)
  const seconds = totalSec - minutes * 60
  return addPrefix(minutes, "0", 2) + ":" + addPrefix(seconds, "0", 2)
}

export const splitIngredientsByCategory = (ingredients) => {
  let result = Object.assign({ meat: [], vegetable: [], spice: [], other: [] })

  for (const ingredient of ingredients) {
    const category = ingredient.ingredient.category.toLowerCase()

    result[category] = result[category].concat(ingredient)
  }

  return result
}

export const splitOrdersByStatus = (orders) => {
  try {
    if (!orders || typeof orders !== "object") return

    let result = Object.assign({
      [STATUS_ALL]: [],
      [STATUS_TO_CONFIRM]: [],
      [STATUS_TO_DELIVER]: [],
      [STATUS_FINISH]: [],
      [STATUS_CANCELED]: [],
    })

    for (const item of orders) {
      const status = item.status

      result[status] = result[status].concat(item)
      result[STATUS_ALL] = result[STATUS_ALL].concat(item)
    }

    return result
  } catch (error) {
    console.error("error from splitOrdersByStatus", error)
  }
}

export const encrypt = (info, key = "%E9%A3%9F%E8%AD%9C") => {
  return crypto.createHash("sha256").update(info).digest("hex")
}
