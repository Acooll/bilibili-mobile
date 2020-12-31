import request from './axios'

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


