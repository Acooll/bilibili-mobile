import React, { useEffect, useState } from 'react'
import * as actionTypes from '../../store/actions';
import { connect } from "react-redux";

import Header from '../../components/Header'
import './style.styl'
import axios from 'axios'

const LivesArea = (props) => {

  const [areas, setAreas] = useState([])
  useEffect(() => {
    axios.get('/live/room/v1/AppIndex/getAreas?device=phone&platform=ios&scale=3&build=3939').then(res => {
      setAreas(res.data.data)
    })
  },[])
  console.log(areas)

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
      <div className='typeArea'>
        <div className='allTypes'>全部分类</div>
        <div className='eachType'>
          {
            areas.map(item => {
              return (
                <div key={(item as any).id} className='item'>
                  <img src={(item as any).entrance_icon.src} alt="" />
                  <div>{(item as any).name}</div>
                </div>
              )
            })
          }
        </div>
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
      getLiveListDispatch() {
        dispatch(actionTypes.fetchLiveList())
      },

    };
  }
)(LivesArea);