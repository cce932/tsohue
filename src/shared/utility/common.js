// 把array以maxRow為限制 分為多維陣列
export const splitToRows = (array, maxRow) => {
    const result = []
    array.map((item, index) => {
        let group = Math.floor(index / maxRow)
        console.log(group)
        result[group] ? result[group].push(item) : result[group] = [item] // 最後的[item] 注意方括號 不然會出現This method ".push" is not define        return null
        return;
    })
    return result
}
