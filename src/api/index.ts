import { request, http } from './axios'

export const getBanner = () => {
  return request.get('/x/web-show/res/loc?pf=7&id=1695')
}

export const getRecommend = () => {
  return request.get('/x/web-interface/wx/hot?ps=100')
}

export const getPlayerUrl = (props) => {
  return request.get(`x/player/playurl?cid=${props[1]}&avid=${props[0]}&platform=html5&otype=json&qn=16&type=mp4&html5=1`)
}

export const getPlayerDetail = (props) => {
  return request.get(`/x/web-interface/view?aid=${props[0]}&bvid=${props[1]}`)
}


export const getDetailRecommend = (props) => {
  return request.get(`x/web-interface/archive/related?aid=${props}&context=`)
}

export const getSearchList = (props) => {
  return request.get(`/x/web-interface/search/all/v2?keyword=${props}&page=1&pagesize=20`)
}

export const getLiveList = () =>{
  return http.get('/room/v2/AppIndex/getAllList?device=phone&platform=ios&scale=3&build=10000')
}

export const getStreaming = (props) =>{
  return http.get(`/room/v1/Room/playUrl?cid=${props}&platform=h5&otype=json&quality=0`)
}

export const getStreamInfo = (props) =>{
  return http.get(`/xlive/web-room/v1/index/getH5InfoByRoom?room_id=${props}`)
}
