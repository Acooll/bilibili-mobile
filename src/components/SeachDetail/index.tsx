import React, { useState } from 'react'
import './style.styl'
import LazyLoad from 'react-lazyload'
import IconPlayed from '../../assets/played.png'
import IconDanmuNum from '../../assets/danmu_num.png'
import IconUp from '../../assets/up.png'
import { tenThousand } from '../../util'


const SearchDetail = (props) => {
  const { searchList, history } = props;
  const [showUp, setShowUp] = useState(false)
  const [chooseType, setChooseType] = useState(0)

  const tab = [
    { id: 0, title: '默认排序' },
    { id: 1, title: '播放多' },
    { id: 2, title: '新发布' },
    { id: 3, title: '弹幕多' }
  ]

  return (
    <div className='searchContent'>
      <div className='searchTab'>
        <div> <span onClick={() => setShowUp(false)} className={showUp ? '' : 'selected'}>综合</span></div>
        <div><span onClick={() => setShowUp(true)} className={showUp ? 'selected' : ''} >up主</span></div>
      </div>
      <div className='chooseType'>
        {
          tab.map(item => {
            return (
              <div key={item.id}>
                <span onClick={() => { setChooseType(item.id) }} className={chooseType === item.id ? 'selectedType' : ''}>{item.title}</span>
              </div>
            )
          })
        }
      </div>
      <div className='contentList'>
        {
          searchList.map(item => {
            return (
              <div className='listItem' key={item.aid} onClick={() => { history.push(`/video?aid=${item.aid}&bvid=${item.bvid}`) }}>
                <div>
                  <LazyLoad placeholder={<img width="100%" height="100%" src='http://s1.hdslb.com/bfs/static/blive/live-web-h5/static/images/img_loading.a3516567.png' alt="m" />}>
                    <img src={item.pic} alt="" />
                  </LazyLoad>
                </div>
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
        }

      </div>
    </div>
  )
}



export default SearchDetail