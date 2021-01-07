import React, { useState } from 'react'
import Header from '../../components/Header'
import './style.styl'
import {Helmet} from 'react-helmet' 


const My = () => {

  const [choiceVideo, setChoiceVideo] = useState(false)


  return (
    <div className='container'>
      <Helmet>
        <title>Bilibili-( ゜- ゜)つロ干杯~-个人空间</title>
      </Helmet>
      <Header />
      <div>
        <div className='banner'>
          <img src="http://s1.hdslb.com/bfs/static/jinkela/mstation-h5/assets/bannerTop_new.png" alt="" />
        </div>
        <div className='userInfo'>
          <img src="http://i2.hdslb.com/bfs/face/c3ef04ba6c267c41067cd7708b7abd60c0c5c49f.jpg" alt="" />
          <div className='fansInfo'>
            <div className='fans'>
              <div className='item'>
                <div className='number'>565</div>
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
          阿酷撒
        </div>
        <div className='userAbout'>这个人很神秘，什么都没有写</div>
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


export default My