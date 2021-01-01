import React, { useEffect, useState } from 'react'
import * as actionTypes from '../../store/actions';
import { connect } from "react-redux";

import Header from '../../components/Header'
import './style.styl'
import Swiper from '../../components/Swiper'
import LiveTypes from '../../components/LiveTypes'


const Live = (props) => {

  const { getLiveListDispatch, liveList, banners } = props


  useEffect(() => {
    if (!liveList.length) {
      getLiveListDispatch()
    }
  }, [])

  return (
    <div>
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