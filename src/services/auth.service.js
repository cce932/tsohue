import axios from "axios"
import { getAuthAPI } from "shared/constants/urls"
import userService from "./user.service"

const register = (account, password, username, phone, email) => {
  return axios.post(getAuthAPI + "/member/register", {
    account,
    password,
    username,
    phone,
    email,
  })
}

const login = (account, password) => {
  return axios
    .post(getAuthAPI + "/login", {
      account,
      password,
    })
    .then((response) => {
      let allResponse = {}

      if (response.data.token) {
        const header = { Authorization: response.data.token } // Authorization 名稱不可改動

        userService.getCurrentMemberData(header).then((memberData) => {
          allResponse = {
            ...response.data,
            ...memberData.data,
          }
          localStorage.setItem("user", JSON.stringify(allResponse)) // save token in localStorage
        })
      }
      return allResponse
    })
}

const logout = () => {
  localStorage.removeItem("user")
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  register,
  login,
  logout,
}
