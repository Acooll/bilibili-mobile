import { AnyAction } from "redux";
import { getBanner, getRecommend, getPlayerUrl,getPlayerDetail,getDetailRecommend,getSearchList} from '../api'

export const SET_BANNERS = 'SET_BANNERS'
export const SET_RECOMMEND = 'SET_RECOMMEND'
export const SET_PLAYER_URL = 'SET_PLAYER_URL'
export const SET_PLAYER_DETAIL = 'SET_PLAYER_DETAIL'
export const SET_DETAIL_RECOMMEND = 'SET_DETAIL_RECOMMEND'
export const SET_SEARCH_LIST = 'SET_SEARCH_LIST'

export const setBanners = (banners: Array<any>): AnyAction => ({
  type: SET_BANNERS,
  banners
})

export const setRecommend = (recommendList: Array<any>): AnyAction => ({
  type: SET_RECOMMEND,
  recommendList
})

export const setPlayerUrl = (playerUrl: Array<any>): AnyAction => ({
  type: SET_PLAYER_URL,
  playerUrl
})

export const setPlayerDetail = (playerDetail: Array<any>): AnyAction => ({
  type: SET_PLAYER_DETAIL,
  playerDetail
})

export const setDetailRecommend = (detailRecommend: Array<any>): AnyAction => ({
  type: SET_DETAIL_RECOMMEND,
  detailRecommend
})

export const setSearchList = (searchList: Array<any>): AnyAction => ({
  type: SET_SEARCH_LIST,
  searchList
})





export const getBannerList = () => {
  return (dispatch) => {
    getBanner().then(res => {
      dispatch(setBanners(res.data))
    }).catch(err => {
      console.log('轮播图数据获取失败！', err)
    })
  }
}


export const getRecommendList = () => {
  return (dispatch) => {
    getRecommend().then(res => {

      dispatch(setRecommend(res.data))
    }).catch(err => {
      console.log('推荐数据获取失败！')
    })
  }
}

export const getPlayer = (props) => {
  return (dispatch) => {
    getPlayerUrl(props).then(res => {
      dispatch(setPlayerUrl(res.data.durl[0].url))
    }).catch(err => {
      console.log('播放源数据获取失败！', err)
    })
  }
}

export const fetchPlayerDetail = (props) => {

  return (dispatch) => {
    getPlayerDetail(props).then(res => {
      dispatch(setPlayerDetail(res.data))
    }).catch(err => {
      console.log('播放详情数据获取失败！', err)
    })
  }
}


export const fetchDetailRecommend = (props) => {

  return (dispatch) => {
    getDetailRecommend(props).then(res => {
      dispatch(setDetailRecommend(res.data))
    }).catch(err => {
      console.log('详情推荐数据获取失败！', err)
    })
  }
}

export const fetchSearchList = (props) => {
  return (dispatch) => {
    getSearchList(props).then(res => {

      dispatch(setSearchList(res.data.result[8].data))
    }).catch(err => {
      console.log('搜索数据获取失败！')
    })
  }
}