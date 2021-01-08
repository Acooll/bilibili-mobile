import React from 'react'
import './style.styl'
import IconRight from '../../assets/right.png'
import LazyLoad from 'react-lazyload'

const LiveTypes = (props) => {

  const { liveList, history } = props

  return (
    <>
      {
        liveList.map((list, i) => {
          return (
            <div key={i} className='liveList'>
              <div className='topBg'></div>
              <div className='listContent'>
                <div className='contentTitle'>
                  <div className='title'>{list.module_info.title}</div>
                  <a href="">
                    <p>进去看看</p>
                    <img src={IconRight} alt="" />
                  </a>
                </div>
                <div className='itemContent'>
                  {
                    list.list.map((item, a) => {
                      return (
                        <div key={a} className='liveItem' onClick={() => history.push(`/live_room?roomid=${item.roomid}`)}>
                          <div>
                            <LazyLoad placeholder={<img width="100%" height="100%" src='http://s1.hdslb.com/bfs/static/blive/live-web-h5/static/images/img_loading.a3516567.png' alt="m" />}>
                              <img src={item.cover} alt="" />
                            </LazyLoad>
                          </div>
                          <div className='liveTitle'>{item.title}</div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          )
        })
      }
      <div className='allType' onClick={()=>history.push(`/lives_area`)}>全部分类</div>
    </>
  )
}


export default LiveTypes