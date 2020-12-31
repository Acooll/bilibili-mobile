import React, { useEffect } from 'react'
import Header from '../../components/Header'
import VideoPlayer from '../../components/VideoPlayer'

import { connect } from "react-redux"
import * as actionTypes from '../../store/actions'
import PlayerDetail from '../../components/PlayerDetail'

const Video = (props) => {
  const { location, playerUrl, getPlayUrlDispatch, getPlayDetailDispatch,getDetailRecommendDispatch, playerDetail ,detailRecommend} = props
  const aid = location.search.match(/\d+/)
  const bvid = location.search.match(/([A-Z])\w+/g)

  useEffect(() => {
    getPlayDetailDispatch([aid, bvid])
    getDetailRecommendDispatch(aid)
  }, [])

  useEffect(() => {
    if (playerDetail !== '') {
      getPlayUrlDispatch([playerDetail.aid, playerDetail.cid])     
    }
  }, [playerDetail])


  return (
    <div>
      <Header  />
      <div>
        <VideoPlayer playerUrl={playerUrl} />
      </div>
      <div>
        <PlayerDetail playerDetail={playerDetail} detailRecommend={detailRecommend} />
      </div>
    </div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return {
      getPlayUrlDispatch(props) {
        dispatch(actionTypes.getPlayer(props))
      },
      getPlayDetailDispatch(props) {
        dispatch(actionTypes.fetchPlayerDetail(props))
      },
      getDetailRecommendDispatch(props) {
        dispatch(actionTypes.fetchDetailRecommend(props))
      },
    };
  }
)(Video);
