import axios from 'axios'
import { getAuthAPI } from '../shared/urls'

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
        if (response.data.accessToken) {
            // response.data: accessToken: "Bearer eyJhb...
            localStorage.setItem('user', JSON.stringify(response.data)) // save token in localStorage
        }
        return response.data
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
