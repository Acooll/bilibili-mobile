import React from 'react'
import Header from '../../components/Header'
import './style.styl'



const My = () => {
  return (
    <div className='container'>
      <Header />
      <div>
        <div className='banner'>
          <img src="http://s1.hdslb.com/bfs/static/jinkela/mstation-h5/assets/bannerTop_new.png" alt="" />
        </div>
        <div className='userInfo'>
          <img src="http:////i2.hdslb.com/bfs/face/c3ef04ba6c267c41067cd7708b7abd60c0c5c49f.jpg" alt=""/>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div>
          阿酷撒
        </div>
        <div>这个人很神秘，什么都没有写</div>
        <div>
          <div>动态</div>
          <div>视频</div>
        </div>
      </div>
      
    </div>
  )
}


export default My