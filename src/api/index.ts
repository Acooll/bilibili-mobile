import request from './axios'

export const getBanner = () => {
  return request.get('/round-sowing')
}

export const getRecommend = () => {
  return request.get('/av/recommend/36631490')
}

export const getPlayerUrl = (props) =>{
  return request.get(`/av/play_url?aId=${props[0]}&cId=${props[1]}`)
}