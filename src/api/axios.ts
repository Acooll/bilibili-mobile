import axios from 'axios'

const BASE_URL = '/api'
const LIVE_URL ='/live'

const request = axios.create({
  baseURL: BASE_URL
})

const http = axios.create({
  baseURL: LIVE_URL
})

request.interceptors.response.use(
  res=>{
    if(res.status===200){
      return res.data
    }
  },
  err=>Promise.reject(err)
)

http.interceptors.response.use(
  res=>{
    if(res.status===200){
      return res.data
    }
  },
  err=>Promise.reject(err)
)


export {
  request,
  http
}
