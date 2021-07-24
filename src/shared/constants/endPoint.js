import axios from 'axios'

export const TS_API = 'http://140.118.9.145:8082'

export const rootAxios = axios.create({
  baseURL: TS_API,
})
