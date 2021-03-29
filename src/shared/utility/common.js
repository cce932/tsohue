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
