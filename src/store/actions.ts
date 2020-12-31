import { AnyAction } from "redux";
import { getBanner, getRecommend, getPlayerUrl } from '../api'

export const SET_BANNERS = 'SET_BANNERS'
export const SET_RECOMMEND = 'SET_RECOMMEND'
export const SET_PLAYER_URL = 'SET_PLAYER_URL'

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
