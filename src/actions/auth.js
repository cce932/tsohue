import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
} from './types'
import AuthService from 'services/auth.service'
import { extractErrorMsg } from 'shared/utility/common'
import { setMessage } from './message'

export const register = (account, password, username, phone, email) => (
  dispatch,
) =>
  AuthService.register(account, password, username, phone, email)
    .then((response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      })

      return Promise.resolve()
    })
    .catch((error) => {
      const message = extractErrorMsg(error)
      dispatch(setMessage(message))
      return Promise.reject(message)
    })

export const login = (account, password) => (dispatch) =>
  AuthService.login(account, password)
    .then((data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      })

      return Promise.resolve()
    })
    // if password or account incorrect, the response would be { status: "401 UNAUTHORIZED", message: "LOGIN FAILURE" }
    // The 401 response message is same as other authentication required endpoint.
    // To reduce confusion, I'll handle the error case in login page, instead of middleware.

export const logout = () => (dispatch) => {
  AuthService.logout()

  dispatch({
    type: LOGOUT,
  })
}
