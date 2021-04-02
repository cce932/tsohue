import _ from "lodash"
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
