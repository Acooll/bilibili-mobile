import React, { useEffect } from 'react'
import './style.styl'
import LazyLoad from 'react-lazyload'


const Recommend = (props) => {
  const { recommendList } = props

  return (
    <div className='recommend_container'>
      {
        recommendList.map(item => {
          return (
          <a key={item.aid} href={`/video?aid=${item.aid}&bvid=${item.bvid}`}  className='recommend_item'>
              <div className='item'>
                <LazyLoad placeholder={<img width="100%" height="100%" src='http://s1.hdslb.com/bfs/static/blive/live-web-h5/static/images/img_loading.a3516567.png' alt="m"/>}>
                <img src={item.pic} alt="" />
              </LazyLoad>
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