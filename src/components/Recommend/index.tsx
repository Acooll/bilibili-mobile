
import './style.styl'
import LazyLoad from 'react-lazyload'
import { tenThousand } from '../../util'

const Recommend = (props) => {
  const { recommendList } = props

  return (
    <div className='recommend_container'>
      {
        recommendList.map(item => {
          return (
            <a key={item.aid} href={`/video?aid=${item.aid}&bvid=${item.bvid}`} className='recommend_item'>
              <div className='item'>
                <LazyLoad placeholder={<img width="100%" height="100%" src='http://s1.hdslb.com/bfs/static/blive/live-web-h5/static/images/img_loading.a3516567.png' alt="m" />}>
                  <img className='listPic' src={item.pic} alt="" />
                </LazyLoad>
                <div className='playedInfo'>
                  <span className='icon-play-count'>
                    <span className='numInfo'>
                      {tenThousand(item.stat.view)}
                    </span>
                  </span>
                  <span className='icon-barrage-count'>
                    <span className='numInfo'>
                      {tenThousand(item.stat.danmaku)}
                    </span>
                  </span>
                </div>
              </div>
              <p className='title'>{item.title}</p>
            </a>
          )
        })
      }
    </div>
  )
}


export default Recommend