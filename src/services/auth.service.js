import axios from 'axios'
import { getAuthAPI } from '../shared/urls'
import userService from './user.service'

const register = (account, password, username, phone, email) => {
  return axios.post(getAuthAPI + 'member/register', {
    account,
    password,
    username,
    phone,
    email
  })
}

const login = (account, password) => {
  return axios.post(getAuthAPI + 'auth/login', {
    account,
    password
  })
    .then((response) => {
      let allResponse = {} // 存放auth/login和member/me 的.data

      if (response.data.accessToken) {
        // response.data: accessToken: "Bearer eyJhb...

        const header = { Authorization: response.data.accessToken }
        userService.getCurrentMemberData(header).then(
          (memberData) => {
            // auth/login和member/me 兩隻api都一起存到localstorage
            allResponse = {
              ...response.data,
              ...memberData.data
            }
            localStorage.setItem('user', JSON.stringify(allResponse)) // save token in localStorage        
          }
        )
      }
      return allResponse
    })
}

const logout = () => {
  localStorage.removeItem('user')
}

export default {
  register,
  login,
  logout
}
