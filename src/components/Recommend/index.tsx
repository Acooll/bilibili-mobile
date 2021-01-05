import React, { useEffect } from 'react'
import './style.styl'

const Recommend = (props) => {
  const { recommendList } = props

  return (
    <div className='recommend_container'>
      {
        recommendList.map(item => {
          return (
          <a key={item.aid} href={`/video?aid=${item.aid}&bvid=${item.bvid}`}  className='recommend_item'>
              <div className='item'>
                <img src={item.pic} alt="" />

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