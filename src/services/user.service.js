import axios from 'axios'
import authHeader from './auth-header'
import { getAuthAPI } from '../shared/urls'

// 抓取每個頁面所需的資料

const getCurrentMemberData = () => {
    return axios.get(getAuthAPI + 'member/me', { headers: authHeader() })
}

export default {
    getCurrentMemberData
}