import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import './style.styl'
import * as actionTypes from '../../store/actions';
import { connect } from "react-redux";
import { tenThousand } from '../../util'
import { Helmet } from 'react-helmet'
import LazyLoad from 'react-lazyload'
import IconPlayed from '../../assets/played.png'
import IconDanmuNum from '../../assets/danmu_num.png'
import IconMale from '../../assets/male.png'
import IconFemale from '../../assets/female.png'



const Space = (props) => {
  const { upInfo, getUpInfoDispatch, upVideo, getUpVideoDispatch ,history,upStat,getUpStatDispatch} = props
  const [choiceVideo, setChoiceVideo] = useState(false)
  const mid = props.location.search.match(/\d+/)

  useEffect(() => {
    getUpInfoDispatch(mid)
    getUpVideoDispatch(mid)
    getUpStatDispatch(mid)
  }, [])

  return (
    <div className='container'>
      <Helmet>
        <title>Bilibili-( ゜- ゜)つロ干杯~-个人空间</title>
      </Helmet>
      <Header />
      <Header />
      <div>
        <div className='banner'>
          <img src="http://s1.hdslb.com/bfs/static/jinkela/mstation-h5/assets/bannerTop_new.png" alt="" />
        </div>
        <div className='userInfo'>
          { 
            upInfo.sex==='保密'? null : <div> <img className='genderIcon' src={upInfo.sex==='女'?IconFemale:IconMale} alt=""/></div>
          }
         
          <img src={upInfo.face} alt="" className='avatar' />
          <div className='fansInfo'>
            <div className='fans'>
              <div className='item'>
                <div className='number'>{tenThousand(upStat.follower)}</div>
                <div className='type'>粉丝</div>
              </div>
              <div className='columLine'></div>
              <div className='item'>
                <div className='number'>{tenThousand(upStat.following)}</div>
                <div className='type'>关注</div>
              </div>
              <div className='columLine'></div>
              <div className='item'>
                <div className='number'>4532</div>
                <div className='type'>获赞</div>
              </div>
            </div>
            <div className='editInfo'>编辑资料</div>
          </div>
        </div>
        <div className='username'>
          {upInfo.name}
        </div>
        <div className='userAbout'>{upInfo.sign}</div>
        <div className='tabBar'>
          <div> <span className={choiceVideo ? ' ' : 'active'} onClick={() => setChoiceVideo(false)}>动态</span></div>
          <div><span className={choiceVideo ? 'active' : ''} onClick={() => setChoiceVideo(true)}>视频</span></div>
        </div>
        <div className='content'>
          {upVideo.length ?
            upVideo.map(item => {
              return (
                <div className='spaceItem' key={item.aid} onClick={() => { history.push(`/video?aid=${item.aid}&bvid=${item.bvid}`) }}>
                  <LazyLoad placeholder={<img width="100%" height="100%" src='http://s1.hdslb.com/bfs/static/blive/live-web-h5/static/images/img_loading.a3516567.png' alt="m" />}>
                    <img src={item.pic} alt="" />
                  </LazyLoad>
                <div className='listRight'>
                  <div className='title' dangerouslySetInnerHTML={{ __html: item.title }}></div>
                  <div className='play_info'>
                    <img className='icon_played' src={IconPlayed} alt="" />

                    <div className='played'>{tenThousand(item.play)}</div>

                    <img className='icon_danmu' src={IconDanmuNum} alt="" />
                    <div className='danmu'>{item.video_review}</div>
                  </div>
                </div>
              </div>
              )
            })
            :
            <>
              <img src="http://s1.hdslb.com/bfs/static/jinkela/mstation-h5/assets/noContent.png" alt="" />
              <div className='sleep'>小哔睡着了~</div>
            </>
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
      getUpInfoDispatch(props) {
        dispatch(actionTypes.fetchUpInfo(props))
      },
      getUpVideoDispatch(props) {
        dispatch(actionTypes.fetchUpVideo(props))
      },
      getUpStatDispatch(props) {
        dispatch(actionTypes.fetchUpStat(props))
      },
    };
  }
)(Space);
