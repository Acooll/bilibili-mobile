import React, { useEffect, useState } from 'react'
import * as actionTypes from '../../store/actions';
import { connect } from "react-redux";
import Logo from "../../components/Logo";
import './style.styl'
import VideoPlayer from '../../components/VideoPlayer'



const LiveRoom = (props) => {
  const { location, getStreamingDispatch, streaming, streamInfo, getStreamInfoDispatch } = props
  const roomid = location.search.match(/\d+/)
  const [activeBar, setActiveBar] = useState(0)
  useEffect(() => {
    // setInterval(()=>{
    getStreamingDispatch(roomid)
    // },5000)
    getStreamInfoDispatch(roomid)
  }, [])
  const anchor_info = streamInfo.anchor_info
  const an = Object.assign({}, anchor_info).base_info
  const base_info = Object.assign({}, an)
  const relation_info = Object.assign({}, anchor_info).relation_info
  const room_info = Object.assign({}, streamInfo.room_info)
  const attention = Object.assign({}, relation_info).attention


  return (
    <div>
      <div className='roomHeader'>
        <a href="/index" className='logo'>
          <Logo />
        </a>
        <div className='liveType'>
          <span onClick={() => props.history.push('/lives_area')}>直播分类</span>
          <span>{'>'}</span>
          <span>视频聊天</span>
        </div>
      </div>
      <div className='livePlayer'>
        <VideoPlayer isLive={true} playerUrl={streaming} />
      </div>
      <div className='liveInfo'>
        <div className='avatar'>
          <img src={base_info.face} alt="" />
        </div>
        <div className='about'>
          <div className='author_name'>主播：{base_info.uname}</div>
          <div className='author_about'>
            <div>人气：{room_info.online}</div>
            <div>粉丝：{attention}</div>
          </div>
        </div>
      </div>
      <div className='chatContainer'>
        <div className='chatBar'>
          <div><span className={activeBar === 0 ? 'activeBar' : ''} onClick={() => { setActiveBar(0) }}>互动</span></div>
          <div><span className={activeBar === 0 ? '' : 'activeBar'} onClick={() => { setActiveBar(1) }}>简介</span></div>
        </div>
        {
          activeBar === 0 ? null :
            <div className='description'>
              <div dangerouslySetInnerHTML={{ __html: room_info.description }}>
              </div>
            </div>
        }

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
      getStreamingDispatch(props) {
        dispatch(actionTypes.fetchStreaming(props))
      },
      getStreamInfoDispatch(props) {
        dispatch(actionTypes.fetchStreamInfo(props))
      },

    };
  }
)(LiveRoom);
