import { SET_BANNERS, SET_RECOMMEND,SET_PLAYER_URL } from './actions'
import { AnyAction, combineReducers } from "redux"



const initialState = {
  banners: [],
  recommendList:[],
  playerUrl:''
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

const reducer = combineReducers({
  banners,
  recommendList,
  playerUrl
})


export default reducer