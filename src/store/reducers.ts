import { SET_BANNERS, SET_RECOMMEND,SET_PLAYER_URL,SET_PLAYER_DETAIL,SET_DETAIL_RECOMMEND,SET_SEARCH_LIST } from './actions'
import { AnyAction, combineReducers } from "redux"



const initialState = {
  banners: [],
  recommendList:[],
  playerUrl:'',
  playerDetail:'',
  detailRecommend:[],
  searchList:[]
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
const reducer = combineReducers({
  banners,
  recommendList,
  playerUrl,
  playerDetail,
  detailRecommend,
  searchList
})


export default reducer