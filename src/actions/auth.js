import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE
} from './types'
import AuthService from '../services/auth.service'
import UserService from '../services/user.service'

// dispatch(action) 一定要回傳action 內容是type屬性和可省略的payload
export const register = (account, password, username, phone, email) => dispatch => {
    // 呼叫axios(爲一Promise) 處理完回傳一resolved或rejected的Promise
    console.log('action register')
    return AuthService.register(account, password, username, phone, email).then(
        (response) => {
            // console.log('action auth:', response);
            dispatch({
                type: REGISTER_SUCCESS
            })

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message // ? response的結構是？？
            })

            return Promise.resolve()
        },
        (error) => {
            const message = // ? 每個都看一下
            (error.response &&
             error.response.data &&
             error.response.data.message) ||
             error.message ||
             error.toString()
             // 如果都為ture, return error.response.data.message

             dispatch({
                 type: REGISTER_FAIL
             })

             dispatch({
                 type: SET_MESSAGE,
                 payload: message
             })
             
             return Promise.reject()
        }
    )
}

export const login = (account, password) => dispatch => {
    return AuthService.login(account, password).then(
        (data) => { // data 就是post之後會拿到的token 是response.data
            // data: accessToken: "Bearer eyJhbG...
            console.log('login action1:', data)
            // UserService.getCurrentMemberData().then(
            //     (data) => {
            //         console.log('\naction, getCurrentMember:', data)
            //         dispatch({
            //             type: LOGIN_SUCCESS,
            //             payload: { user: {
            //                 ...data,
            //                 accessToken: 1 }
            //             }
            //         })
        
            //         return Promise.resolve()
            //     }
            // )
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    user: {
                        accessToken: 123,
                        b: 1
                    }
                }
            })

            return Promise.resolve()
        },
        (error) => {
            const message = 
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()

            dispatch({
                type: LOGIN_FAIL,
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message
            })

            return Promise.reject()
        }
    )
}

export const logout = () => dispatch => {
    AuthService.logout()

    dispatch({
        type: LOGOUT,
    })
}
