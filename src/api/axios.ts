import axios from 'axios'

const BASE_URL = '/api'
const LIVE_URL ='/live'
const LOCAL_URL = '/local'
const SEARCH_URL = '/search'

const request = axios.create({
  baseURL: BASE_URL
})

const http = axios.create({
  baseURL: LIVE_URL
})

const fetch = axios.create({
  baseURL: LOCAL_URL
})

const search = axios.create({
  baseURL: SEARCH_URL
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

fetch.interceptors.response.use(
  res=>{
    if(res.status===200){
      return res.data
    }
  },
  err=>Promise.reject(err)
)


search.interceptors.response.use(
  res=>{
    if(res.status===200){
      return res.data
    }
  },
  err=>Promise.reject(err)
)

export {
  request,
  http,
  fetch,
  search
}
