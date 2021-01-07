import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import VideoPlayer from '../../components/VideoPlayer'
import './style.styl'
import { connect } from "react-redux"
import * as actionTypes from '../../store/actions'
import PlayerDetail from '../../components/PlayerDetail'
import Comments from '../../components/Comments'
import {Helmet} from 'react-helmet'

const Video = (props) => {
  const { location, playerUrl,
    getPlayUrlDispatch, getPlayDetailDispatch,
    getDetailRecommendDispatch, playerDetail,
    detailRecommend, danmu, getDanmuDispatch,
    getCommentsDispatch,comments
  } = props
  const aid = location.search.match(/\d+/)
  const bvid = location.search.match(/([A-Z])\w+/g)
  const [showPic, setShowPic] = useState(true)

  useEffect(() => {
    getPlayDetailDispatch([aid, bvid])
    getDetailRecommendDispatch(aid)
    getCommentsDispatch(aid)
    // eslint-disable-next-line
  }, [Number(aid)])

  useEffect(() => {
    if (playerDetail !== '') {
      getPlayUrlDispatch([playerDetail.aid, playerDetail.cid])
      getDanmuDispatch(playerDetail.cid)
    }
    // eslint-disable-next-line
  }, [playerDetail])

  const closePic = (props) => {
    setShowPic(!props)
  }

  return (
    <div className='videoHome'>
      <Helmet>
        <title>Bilibili-( ゜- ゜)つロ干杯~-视频</title>
      </Helmet>
      <Header />
      <Header />
      <div className='videoContent'>
        {
          showPic ? <img className='videoPic' src={playerDetail.pic} alt="" /> : null
        }
        <VideoPlayer playerUrl={playerUrl} closePic={closePic} danmu={danmu} />
      </div>
      <div className='detailVideoList'>
        <PlayerDetail comments={comments} playerDetail={playerDetail} detailRecommend={detailRecommend} history={props.history} />
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
      getDanmuDispatch(props) {
        dispatch(actionTypes.fetchDanmu(props))
      },
      getCommentsDispatch(props) {
        dispatch(actionTypes.fetchComments(props))
      },
    };
  }
)(Video);
