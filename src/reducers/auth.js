import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
} from 'actions/types'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null }

const auth = (state = initialState, action) => {
    const { type, payload } = action
    
    switch (type) {
        case REGISTER_SUCCESS:  // 註冊成功 要登出
            return {
                ...state,
                isLoggedIn: false
            }
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false // 防範localStorage的user資料存在時 又register fail (只是目前想不到這種情境)
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user // 透過action打api(auth/login和member/me) 回傳的response.data
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        default:
            // 之所以會在點login後 閃過一下設定的state又消失 是redux內部有dispatch action 好像是把localStorage的設定值放到state
            return state
    }
}

export default auth