import React from 'react'
import './style.styl'
import IconRank1 from '../../assets/rank1.png'
import IconRank2 from '../../assets/rank2.png'
import IconRank3 from '../../assets/rank3.png'
import IconPlayed from '../../assets/played.png'
import IconDanmuNum from '../../assets/danmu_num.png'
import IconUp from '../../assets/up.png'
import { tenThousand } from '../../util'
import LazyLoad from 'react-lazyload'

const IconList = [{ id: 0, icon: IconRank1 }, { id: 1, icon: IconRank2 }, { id: 2, icon: IconRank3 }]



const RankList = (props) => {
  const { rankingList, history } = props

  return (
    <div className='rankList_container'>
      {
        rankingList.map((item, i) => {
          return (
            <div key={item.aid} className='rank_item' onClick={() => history.push(`/video?aid=${item.aid}&bvid=${item.bvid}`)}>
              <div className='rank_index'>
                {
                  i <= 2 ? <img src={IconList[i].icon} alt="" /> : i + 1
                }
              </div>
              <div className='rank_pic'>
                <LazyLoad placeholder={<img width="100%" height="100%" src='http://s1.hdslb.com/bfs/static/blive/live-web-h5/static/images/img_loading.a3516567.png' alt="m" />}>
                  <img src={item.pic} alt="" />
                </LazyLoad>
              </div>
              <div className='rank_info'>
                <div className='title'> {item.title}</div>
                <div className='up_name'>
                  <img src={IconUp} alt="" />
                  <div className='name'>{item.owner.name}</div>
                </div>
                <div className='play_info'>
                  <img className='icon_played' src={IconPlayed} alt="" />

                  <div className='played'>{tenThousand(item.stat.view)}</div>

                  <img className='icon_danmu' src={IconDanmuNum} alt="" />
                  <div className='danmu'>{item.stat.danmaku}</div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}


export default RankList