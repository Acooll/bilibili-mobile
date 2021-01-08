import { AnyAction } from "redux";
import {
  getBanner,
  getRecommend,
  getPlayerUrl,
  getPlayerDetail,
  getDetailRecommend,
  getSearchList,
  getLiveList,
  getStreaming,
  getStreamInfo,
  getUpInfo,
  getRegion,
  getDanmu,
  getComments,
  getRankingList,
  getSearchSuggest,
  getUpVideo,
  getUpStat,
  getUpAchieveLike,
  getAllLiveList
} from '../api'

export const SET_BANNERS = 'SET_BANNERS'
export const SET_RECOMMEND = 'SET_RECOMMEND'
export const SET_PLAYER_URL = 'SET_PLAYER_URL'
export const SET_PLAYER_DETAIL = 'SET_PLAYER_DETAIL'
export const SET_DETAIL_RECOMMEND = 'SET_DETAIL_RECOMMEND'
export const SET_SEARCH_LIST = 'SET_SEARCH_LIST'
export const SET_LIVE_LIST = 'SET_LIVE_LIST'
export const SET_STRAMING = 'SET_STREAMING'
export const SET_STRAM_INFO = 'SET_STREAM_INFO'
export const SET_UP_INFO = 'SET_UP_INFO'
export const SET_REGION = 'SET_REGION'
export const SET_DANMU = 'SET_DANMU'
export const SET_COMMENTS = 'SET_COMMENTS'
export const SET_RANKING_LIST = 'SET_RANKING_LIST'
export const SET_SEARCH_SUGGEST = 'SET_SEARCH_SUGGEST'
export const SET_UP_VIDEO = 'SET_UP_VIDEO'
export const SET_UP_STAT = 'SET_UP_STAT'
export const SET_LOADING = 'SET_LOADING'
export const SET_UP_ACHIEVE_LIKE = 'SET_UP_ACHIEVE_LIKE'
export const SET_ALL_LIVE_LIST = 'SET_ALL_LIVE_LIST'

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

export const setComments = (comments: Array<any>): AnyAction => ({
  type: SET_COMMENTS,
  comments
})

export const setDetailRecommend = (detailRecommend: Array<any>): AnyAction => ({
  type: SET_DETAIL_RECOMMEND,
  detailRecommend
})

export const setSearchList = (searchList: Array<any>): AnyAction => ({
  type: SET_SEARCH_LIST,
  searchList
})


export const setLiveList = (liveList: Array<any>): AnyAction => ({
  type: SET_LIVE_LIST,
  liveList
})


export const setStreaming = (streaming: Array<any>): AnyAction => ({
  type: SET_STRAMING,
  streaming
})


export const setStreamInfo = (streamInfo: Array<any>): AnyAction => ({
  type: SET_STRAM_INFO,
  streamInfo
})


export const setUpInfo = (upInfo: Array<any>): AnyAction => ({
  type: SET_UP_INFO,
  upInfo
})

export const setRegion = (region: Array<any>): AnyAction => ({
  type: SET_REGION,
  region
})

export const setDanmu = (danmu: Array<any>): AnyAction => ({
  type: SET_DANMU,
  danmu
})


export const setRankList = (rankingList: Array<any>): AnyAction => ({
  type: SET_RANKING_LIST,
  rankingList
})



export const setSearchSuggest = (searchSuggest: Array<any>): AnyAction => ({
  type: SET_SEARCH_SUGGEST,
  searchSuggest
})

export const setUpVideo = (upVideo: Array<any>): AnyAction => ({
  type: SET_UP_VIDEO,
  upVideo
})


export const setUpStat = (upStat: Array<any>): AnyAction => ({
  type: SET_UP_STAT,
  upStat
})


export const setLoading = (loading: boolean): AnyAction => ({
  type: SET_LOADING,
  loading
})

export const setUpAchieveLike = (upAchieveLike: boolean): AnyAction => ({
  type: SET_UP_ACHIEVE_LIKE,
  upAchieveLike
})


export const setAllLiveList = (allLiveList: boolean): AnyAction => ({
  type: SET_ALL_LIVE_LIST,
  allLiveList
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
      dispatch(setLoading(false))
    }).catch(err => {
      console.log('推荐数据获取失败！')
    })
  }
}

export const getPlayer = (props) => {
  return (dispatch) => {
    getPlayerUrl(props).then(res => {
      dispatch(setPlayerUrl(res.data.durl[0]))
    }).catch(err => {
      console.log('播放源数据获取失败！', err)
    })
  }
}

export const fetchPlayerDetail = (props) => {

  return (dispatch) => {
    getPlayerDetail(props).then(res => {
      dispatch(setPlayerDetail(res.data))
      dispatch(setLoading(false))
    }).catch(err => {
      console.log('播放详情数据获取失败！', err)
    })
  }
}


export const fetchComments = (props) => {

  return (dispatch) => {
    getComments(props).then(res => {
      dispatch(setComments(res.data.replies))
    }).catch(err => {
      console.log('评论数据获取失败！', err)
    })
  }
}

export const fetchDetailRecommend = (props) => {

  return (dispatch) => {
    getDetailRecommend(props).then(res => {
      dispatch(setDetailRecommend(res.data))
      dispatch(setLoading(false))
    }).catch(err => {
      console.log('详情推荐数据获取失败！', err)
    })
  }
}

export const fetchSearchList = (props) => {
  return (dispatch) => {
    getSearchList(props).then(res => {

      dispatch(setSearchList(res.data.result[8].data))
      dispatch(setLoading(false))
    }).catch(err => {
      console.log('搜索数据获取失败！')
    })
  }
}

export const fetchLiveList = () => {
  return (dispatch) => {
    getLiveList().then(res => {
      console.log(res.data)
      dispatch(setLiveList(res.data.module_list))
      dispatch(setLoading(false))
      dispatch(setBanners(res.data.module_list[0].list))

    }).catch(err => {
      console.log('直播列表数据获取失败！', err)
    })
  }
}


export const fetchAllLiveList = () => {
  return (dispatch) => {
    getAllLiveList().then(res => {
      console.log(res.data)
      dispatch(setAllLiveList(res.data.list))
      dispatch(setLoading(false))

    }).catch(err => {
      console.log('all直播列表数据获取失败！', err)
    })
  }
}

export const fetchStreaming = (props) => {
  return (dispatch) => {
    getStreaming(props).then(res => {

      dispatch(setStreaming(res.data.durl))

    }).catch(err => {
      console.log('直播流数据获取失败！', err)
    })
  }
}

export const fetchStreamInfo = (props) => {
  return (dispatch) => {
    getStreamInfo(props).then(res => {

      dispatch(setStreamInfo(res.data))

    }).catch(err => {
      console.log('直播数据获取失败！', err)
    })
  }
}



export const fetchUpInfo = (props) => {
  return (dispatch) => {
    getUpInfo(props).then(res => {

      dispatch(setUpInfo(res.data))

    }).catch(err => {
      console.log('up数据获取失败！', err)
    })
  }
}

export const fetchRegion = (props) => {
  return (dispatch) => {
    getRegion(props).then(res => {

      dispatch(setRegion(res.data))
      dispatch(setLoading(false))
    }).catch(err => {
      console.log('region数据获取失败！', err)
    })
  }
}

export const fetchDanmu = (props) => {
  return (dispatch) => {
    getDanmu(props).then(res => {
      dispatch(setDanmu(res.data))
    }).catch(err => {
      console.log('danmu数据获取失败！', err)
    })
  }
}


export const fetchRankingList = (props) => {
  return (dispatch) => {
    getRankingList(props).then(res => {
      dispatch(setRankList(res.data.list))
      dispatch(setLoading(false))
    }).catch(err => {
      console.log('ranking数据获取失败！', err)
    })
  }
}

export const fetchSearchSuggest = (props) => {
  return (dispatch) => {
    getSearchSuggest(props).then(res => {

      dispatch(setSearchSuggest((res as any).result.tag))
    }).catch(err => {
      console.log('search数据获取失败！', err)
    })
  }
}


export const fetchUpVideo = (props) => {
  return (dispatch) => {
    getUpVideo(props).then(res => {

      dispatch(setUpVideo(res.data.list.vlist))
    }).catch(err => {
      console.log('upVideo数据获取失败！', err)
    })
  }
}

export const fetchUpStat = (props) => {
  return (dispatch) => {
    getUpStat(props).then(res => {

      dispatch(setUpStat(res.data))
    }).catch(err => {
      console.log('upStat数据获取失败！', err)
    })
  }
}

export const fetchUpAchieveLike = (props) => {
  return (dispatch) => {
    getUpAchieveLike(props).then(res => {

      dispatch(setUpAchieveLike(res.data))
    }).catch(err => {
      console.log('upAchieveLike数据获取失败！', err)
    })
  }
}

