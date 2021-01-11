import React, { useState } from 'react'
import IconHot from '../../assets/fire.png'
import './style.styl'
import IconZan from '../../assets/zan.png'
import IconStar from '../../assets/star.png'
import IconDownload from '../../assets/download.png'
import IconBan from '../../assets/ban.png'
import classnames from 'classnames'
import IconArrowDown from '../../assets/arrow_down.png'
import { timestampToTime, tenThousand } from '../../util'
import Comments from '../../components/Comments'
import LazyLoad from 'react-lazyload'

const PlayerDetail = (props) => {
  const { playerDetail, detailRecommend, history, comments } = props
  const author = Object.assign({}, playerDetail.owner)
  const stat = Object.assign({}, playerDetail.stat)

  const [spread, setSpread] = useState(false)
  const [selectComments, setSelectComments] = useState(false)

  const toggleSpread = () => {
    if (spread) {
      setSpread(false)
    } else {
      setSpread(true)
    }
  }




  return (
    <div className='detail_container'>
      <div className='player_info'   >
        <div className='top_info'>
          <div className='hot'>
            <img src={IconHot} alt="" />
            <span>热门</span>
          </div>
          <h1 className={classnames(spread ? 'spreadTitle' : 'title')}>{playerDetail.title}</h1>
          <img className={classnames('iconDown', spread ? 'spreadClass' : '')} onClick={toggleSpread} src={IconArrowDown} alt="" />
        </div>

        {
          spread ? <div className='detail_info'>
            <div className='author' >
              <img className='avatar' src={author.face} alt="" onClick={() => history.push(`/space?mid=${author.mid}`)} />
              <div>
                <div className='author_name'>{author.name}</div>
                <div className='fans'>60.5万粉丝</div>
              </div>
              <div className='payAttention'>+ 关注</div>
            </div>
            <div className='viewInfo'>
              <span>{tenThousand(playerDetail.stat.view)}观看</span>
              <span>{tenThousand(playerDetail.stat.danmaku)}弹幕</span>
              <span>{timestampToTime(playerDetail.pubdate).substr(0, 10)}</span>
            </div>
            <div className='banInfo'>
              <img src={IconBan} alt="" />
              <span>未经作者授权禁止转载</span>
            </div>
            <div className='authorSay'>{playerDetail.desc}</div>
            <div className='left_info'>
              <div className='tool'>
                <img src={IconZan} alt="" />
                <span>{tenThousand(stat.like)}</span>
              </div>
              <div className='tool'> <img src={IconStar} alt="" />
                <span>{tenThousand(stat.favorite)}</span>
              </div>
              <div className='tool'> <img src={IconDownload} alt="" />
                <span>缓存</span>
              </div>
            </div>

          </div> :
            <div className='video_tool'>
              <div className='author'>
                <img className='avatar' src={author.face} onClick={() => history.push(`/space?mid=${author.mid}`)} alt="" />
                <div className='author_name'>{author.name}</div>
              </div>
              <div className='tool'>
                <img src={IconZan} alt="" />
                <span>{tenThousand(stat.like)}</span>
              </div>
              <div className='tool'> <img src={IconStar} alt="" />
                <span>{tenThousand(stat.favorite)}</span>
              </div>
              <div className='tool'> <img src={IconDownload} alt="" />
                <span>缓存</span></div>
            </div>
        }
      </div>
      <div className='recommendList'>
        <div className='listBar'>
          <div onClick={() => setSelectComments(false)}> <span className={selectComments ? '' : 'selected'}>相关推荐</span></div>
          <div onClick={() => setSelectComments(true)}><span className={selectComments ? 'selected' : ''}>评论</span></div>
        </div>
        <div className={classnames('listContainer', selectComments ? 'commentsSelected' : '')} >
          {
            detailRecommend.map((item) => {
              return (
                <div key={item.aid} className='listItem' onClick={() => history.push(`/video?aid=${item.aid}&bvid=${item.bvid}`)}>
                  <div>
                    <LazyLoad placeholder={<img width="80%" height="60%" src='http://s1.hdslb.com/bfs/static/blive/live-web-h5/static/images/img_loading.a3516567.png' alt="m" />}>
                      <img src={item.pic} alt="" />
                    </LazyLoad>
                  </div>
                  <div className='itemTitle'>{item.title}</div>
                </div>
              )
            })
          }
        </div>
        {
          selectComments ? <Comments comments={comments} history={history} /> : null
        }
      </div>

    </div>
  )
}



export default PlayerDetail