import React from 'react'
import './style.styl'
import IconRight from '../../assets/arrow_right.png'
import IconRank from '../../assets/icon_rank.png'
import LazyLoad from 'react-lazyload'
import { tenThousand } from '../../util'

const ChannelList = (props) => {
  const { region, history, rid } = props

  return (
    <div className='channelList'>
      <div className='listContent'>
        <div className='contentTitle'>
          <div className='title'>热门推荐</div>
          <a href={`/ranking?rid=${rid}`}>
            <img src={IconRank} alt="" />
            <p>排行榜</p>
            <img src={IconRight} alt="" />
          </a>
        </div>
        <div className='itemContent'>
          {
            region.map((item, a) => {
              return (
                <div key={a} className='liveItem' onClick={() => { history.push(`/video?aid=${item.aid}&bvid=${item.bvid}`) }}>
                  <div>
                    <LazyLoad>
                      <img src={item.pic} alt="" />
                    </LazyLoad>
                    <div className='playedInfo'>
                      <span className='icon-play-count'>
                        <span className='numInfo'>
                          {tenThousand(item.play)}
                        </span>
                      </span>
                      <span className='icon-barrage-count'>
                        <span className='numInfo'>
                          {tenThousand(item.review)}
                        </span>
                      </span>
                    </div>
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
}


export default ChannelList
