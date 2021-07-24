import axios from 'axios'
import authHeader from './auth-header'
import { TS_API } from 'shared/constants/endPoint'

const getCurrentMemberData = (token = authHeader()) => {
  return axios.get(TS_API + '/member/me', { headers: token }).then(
    response => {
      return response
    },
    error => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      console.error('services/user.service getCurrentMemberData error:\n', message)
    },
  )
}

export default {
  getCurrentMemberData,
}
