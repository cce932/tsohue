
// /auth/parse 所需 | 有在user.service用到 因為要存取會員頁面資料

// auth.service的login 會儲存localStorage key為'user'
// 抓儲存在localStorage的'user'
const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if ( user && user.token) {
        return { Authorization: user.token }
    } else {
        return {}
    }
}

export default authHeader