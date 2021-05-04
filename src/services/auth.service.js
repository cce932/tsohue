import axios from "axios"
import { TS_API } from "shared/constants/endPoint"
import userService from "./user.service"

const register = (account, password, username, phone, email) => {
  return axios.post(TS_API + "/member/register", {
    account,
    password,
    username,
    phone,
    email,
  })
}

const login = (account, password) => {
  return axios
    .post(TS_API + "/login", {
      account,
      password,
    })
    .then(async (response) => {
      let allResponse = { ...response.data }

      if (response.data.token) {
        const header = { Authorization: response.data.token } // Authorization 名稱不可改動
        const memberData = await userService.getCurrentMemberData(header) // 如果沒加await 就會直接return 不等getCurrentMemberData

        allResponse = {
          ...allResponse,
          ...memberData.data,
        }
      }
      localStorage.setItem("user", JSON.stringify(allResponse))

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
