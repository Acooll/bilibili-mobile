import axios from 'axios'

const BASE_URL = '/api'

const request = axios.create({
  baseURL: BASE_URL
})


request.interceptors.response.use(
  res=>{
    if(res.status===200){
      return res.data
    }
  },
  err=>Promise.reject(err)
)

export default request