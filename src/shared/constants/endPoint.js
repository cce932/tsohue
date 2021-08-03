import axios from 'axios'

export const TS_API = 'http://140.118.110.203:8082'

export const rootAxios = axios.create({
  baseURL: TS_API,
})
