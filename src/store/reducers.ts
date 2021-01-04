import { SET_BANNERS, 
  SET_RECOMMEND,
  SET_PLAYER_URL,
  SET_PLAYER_DETAIL,
  SET_DETAIL_RECOMMEND,
  SET_SEARCH_LIST,
  SET_LIVE_LIST ,
  SET_STRAMING,
  SET_STRAM_INFO,
  SET_UP_INFO,
  SET_REGION,
  SET_DANMU,
  SET_COMMENTS
} from './actions'
import { AnyAction, combineReducers } from "redux"



const initialState = {
  banners: [],
  recommendList:[],
  playerUrl:'',
  playerDetail:'',
  detailRecommend:[],
  searchList:[],
  liveList:[],
  streaming:[],
  streamInfo:'',
  upInfo:'',
  region:[],
  danmu:[],
  comments:[]
}


function banners(banners = initialState.banners, action: AnyAction){
  switch(action.type){
    case SET_BANNERS:
      return action.banners;
      default:
        return banners;
  }
}


function recommendList(recommendList = initialState.recommendList, action: AnyAction){
  switch(action.type){
    case SET_RECOMMEND:
      return action.recommendList;
      default:
        return recommendList;
  }
}


function playerUrl(playerUrl = initialState.playerUrl, action: AnyAction){
  switch(action.type){
    case SET_PLAYER_URL:
      return action.playerUrl;
      default:
        return playerUrl;
  }
}


function playerDetail(playerDetail = initialState.playerDetail, action: AnyAction){
  switch(action.type){
    case SET_PLAYER_DETAIL:
      return action.playerDetail;
      default:
        return playerDetail;
  }
}


function comments(comments = initialState.comments, action: AnyAction){
  switch(action.type){
    case SET_COMMENTS:
      return action.comments;
      default:
        return comments;
  }
}

function detailRecommend(detailRecommend = initialState.detailRecommend, action: AnyAction){
  switch(action.type){
    case SET_DETAIL_RECOMMEND:
      return action.detailRecommend
      default:
        return detailRecommend;
  }
}

function searchList(searchList = initialState.searchList, action: AnyAction){
  switch(action.type){
    case SET_SEARCH_LIST:
      return action.searchList
      default:
        return searchList;
  }
}

function liveList(liveList = initialState.liveList, action: AnyAction){
  switch(action.type){
    case SET_LIVE_LIST:
      return action.liveList
      default:
        return liveList;
  }
}


function streaming(streaming = initialState.streaming, action: AnyAction){
  switch(action.type){
    case SET_STRAMING:
      return action.streaming
      default:
        return streaming;
  }
}

function streamInfo(streamInfo= initialState.streamInfo, action: AnyAction){
  switch(action.type){
    case SET_STRAM_INFO:
      return action.streamInfo
      default:
        return streamInfo;
  }
}


function upInfo(upInfo= initialState.upInfo, action: AnyAction){
  switch(action.type){
    case SET_UP_INFO:
      return action.upInfo
      default:
        return upInfo;
  }
}

function region(region= initialState.region, action){
  switch(action.type){
    case SET_REGION:
      return action.region
      default:
        return region;
  }
}


function danmu(danmu= initialState.danmu, action: AnyAction){
  switch(action.type){
    case SET_DANMU:
      return action.danmu
      default:
        return danmu
  }
}


const reducer = combineReducers({
  banners,
  recommendList,
  comments,
  playerUrl,
  playerDetail,
  detailRecommend,
  searchList,
  liveList,
  streaming,
  streamInfo,
  upInfo,
  region,
  danmu
})


export default reducer