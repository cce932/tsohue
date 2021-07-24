import { SET_MESSAGE } from 'actions/types'
import {
  BAD_REQUEST,
  UNEXPECTED_ERROR,
  TOKEN_EXPIRED,
  EMPTY_TOKEN,
  UNAUTHORIZED,
  LOGIN_FAILURE,
  CONFLICT,
} from 'shared/constants/error'
import { logout } from 'actions/auth'

const handleError = (store) => (next) => (action) => {
  if (action.type === SET_MESSAGE) {
    const { status, message, debugMessage, next: from } = action.payload

    switch (status) {
      case BAD_REQUEST:
        if (UNEXPECTED_ERROR.test(message)) {
          if (
            TOKEN_EXPIRED.test(debugMessage) ||
            EMPTY_TOKEN.test(debugMessage)
          ) {
            store.dispatch(logout())
            window.location = '/login'
          }
        }
        break
      case UNAUTHORIZED:
        if (message === LOGIN_FAILURE) {
          window.location = `/login?next=${from || window.location.pathname}`
          window.alert('請登入')
        }
        break
      case CONFLICT:
        window.alert('此帳號已被使用，請試試其他名稱喔')
        break
      default:
        if (status && message && debugMessage) {
          return console.error(
            '未知錯誤！！\nstatus:' +
              status +
              '\nmessage:' +
              message +
              '\ndebugMessage: ' +
              debugMessage,
          )
        } else {
          return console.error('未知錯誤！！\n' + JSON.stringify(action.payload))
        }
    }
  } else {
    return next(action)
  }
}
export default handleError
