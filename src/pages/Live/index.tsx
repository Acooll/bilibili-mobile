import React, { useEffect } from 'react'
import * as actionTypes from '../../store/actions';
import { connect } from "react-redux";
import { Helmet } from 'react-helmet'
import Header from '../../components/Header'
import './style.styl'
import Swiper from '../../components/Swiper'
import LiveTypes from '../../components/LiveTypes'
import Loading from '../../components/Loading'

const Live = (props) => {

  const { getLiveListDispatch, liveList, banners, loading } = props


  useEffect(() => {
    if (!liveList.length) {
      getLiveListDispatch()
    }
  }, [liveList,getLiveListDispatch])

  return (
    <div>
      <Helmet>
        <title>Bilibili-( ゜- ゜)つロ干杯~-直播</title>
      </Helmet>
      <Header />
      <div className='liveBar'>
        <div>首页</div>
        <div>频道</div>
        <div className='live'>直播</div>
        <div>排行</div>
        <div>我的</div>
      </div>
      <div className='liveBanner'>
        <Swiper bannerList={banners} />
      </div>
      {
        loading ? <Loading /> : null
      }
      <LiveTypes liveList={liveList.slice(13)} history={props.history} />
      
    </div>
  )
}


export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return {
      getLiveListDispatch() {
        dispatch(actionTypes.fetchLiveList())
      },

    };
  }
)(Live);