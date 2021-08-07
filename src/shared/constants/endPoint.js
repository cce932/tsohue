import axios from 'axios'

export const TS_API = 'http://localhost:8082'

export const rootAxios = axios.create({
  baseURL: TS_API,
})
