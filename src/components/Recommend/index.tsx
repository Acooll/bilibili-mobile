import React, { useEffect } from 'react'
import './style.styl'

const Recommend = (props) => {
  const { recommendList } = props
  console.log(recommendList)


  return (
    <div className='recommend_container'>
      {
        recommendList.map(item => {
          return (
          <a key={item.aid} href={`/video?aid=${item.aid}&cid=${item.cid}`}  className='recommend_item'>
              <div className='item'>
                <img src={item.pic} alt="" />

              </div>
              <div className='title'>{item.title}</div>
            </a>
          )
        })
      }
    </div>
  )
}


export default Recommend