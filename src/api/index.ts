import { request, http, fetch, search } from './axios'

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

export const getComments = (props) => {
  return request.get(`/x/v2/reply/main?oid=${props}&type=1`)
}



export const getDetailRecommend = (props) => {
  return request.get(`x/web-interface/archive/related?aid=${props}&context=`)
}

export const getSearchList = (props) => {
  return request.get(`/x/web-interface/search/all/v2?keyword=${props}&page=1&pagesize=20`)
}

export const getLiveList = () => {
  return http.get('/room/v2/AppIndex/getAllList?device=phone&platform=ios&scale=3&build=10000')
}

export const getStreaming = (props) => {
  return http.get(`/room/v1/Room/playUrl?cid=${props}&platform=h5&otype=json&quality=0`)
}

export const getStreamInfo = (props) => {
  return http.get(`/xlive/web-room/v1/index/getH5InfoByRoom?room_id=${props}`)
}
export const getUpInfo = (props) => {
  return request.get(`/x/space/acc/info?mid=${props}`)
}

export const getRegion = (props) => {
  return request.get(`/x/web-interface/ranking/region?rid=${props}&day=7`)
}

export const getDanmu = (props) => {
  return fetch.get(`/av/barrage/${props}`)
}

export const getDanmuConfig = (props) => {
  return http.get(`/xlive/web-room/v1/index/getDanmuInfo?id=${props}`)
}

export const getRankingList = (props) => {
  return request.get(`/x/web-interface/ranking/v2?rid=${props}`)
}


export const getSearchSuggest = (props) => {
  return search.get(`/main/suggest?func=suggest&suggest_type=accurate&sub_type=tag&main_ver=v1&highlight=&bangumi_acc_num=3&special_acc_num=0&upuser_acc_num=0&tag_num=10&term=${props}&rnd=0.4420695060880957`)
}

export const getUpVideo = (props) => {
  return request.get(`/x/space/arc/search?pn=1&ps=100&order=click&keyword=&mid=${props}`)
}

export const getUpStat= (props) => {
  return request.get(`/x/relation/stat?vmid=${props}`)
}


export const getUpAchieveLike= (props) => {
  return request.get(`/x/space/upstat?mid=${props}`)
}



export const getAllLiveList = () => {
  return http.get('/room/v3/Area/getRoomList?parent_area_id=0&area_id=0&sort_type=online&page=1&page_size=30&device=phone&platform=ios&scale=3&build=10000')
}
