import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import './style.styl'
import * as actionTypes from '../../store/actions';
import { connect } from "react-redux";
import{tenThousand} from '../../util'

const Space = (props) => {
  const {upInfo,getUpInfoDispatch} = props
  const [choiceVideo, setChoiceVideo] = useState(false)
  const mid = props.location.search.match(/\d+/)

  useEffect(()=>{
    getUpInfoDispatch(mid)
  },[])

  return (
    <div className='container'>
      <Header />
      <div>
        <div className='banner'>
          <img src="http://s1.hdslb.com/bfs/static/jinkela/mstation-h5/assets/bannerTop_new.png" alt="" />
        </div>
        <div className='userInfo'>
          <img src={upInfo.face} alt="" />
          <div className='fansInfo'>
            <div className='fans'>
              <div className='item'>
                <div className='number'>666</div>
                <div className='type'>粉丝</div>
              </div>
              <div className='columLine'></div>
              <div className='item'>
                <div className='number'>35</div>
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
          <div> <span className={choiceVideo ? ' ' : 'active'} onClick={()=>setChoiceVideo(false)}>动态</span></div>
          <div><span className={choiceVideo ? 'active' : ''} onClick={()=>setChoiceVideo(true)}>视频</span></div>
        </div>
        <div className='content'>
            <img src="http://s1.hdslb.com/bfs/static/jinkela/mstation-h5/assets/noContent.png" alt=""/>
            <div className='sleep'>小哔睡着了~</div>
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
     
    };
  }
)(Space);
