import React, { useEffect } from 'react'
import './style.styl'
import { timestampToTime, wordTransform } from '../../util'
import IconZan from '../../assets/zan.png'
import IconMale from '../../assets/male.png'
import IconFemale from '../../assets/female.png'
import LazyLoad from 'react-lazyload'

const Comments = (props) => {
  const { comments,history } = props

  useEffect(() => {

  }, [comments])

  return (
    <div className='commentsContainer'>

      {
        comments.map(item => {
          return (
            <div className='comments' key={item.rpid}>
              <div className='creatorInfo'   onClick={() => history.push(`/space?mid=${item.member.mid}`)}>
                <div className='avatar'>
                   <LazyLoad placeholder={<img width="100%" height="100%" src='http://s1.hdslb.com/bfs/static/blive/live-web-h5/static/images/img_loading.a3516567.png' alt="m"/>}>
                  <img src={item.member.avatar} alt="" />
                  </LazyLoad>
                  {
                    item.member.sex === '保密'? null : <img src={item.member.sex === '女' ? IconFemale : IconMale} className='gender' alt="" />
                  }
                  
                </div>
                <div className='uname-date'>
                  <div>{item.member.uname}</div>
                  <div>{timestampToTime(item.ctime).substring(0, 9)}</div>
                </div>
                <div className='iconfonts'><img src={IconZan} alt="" /> <span>{item.like}</span> </div>
              </div>
              <div className='creatorSays' dangerouslySetInnerHTML={{ __html: wordTransform(item.content) }}>

              </div>
            </div>
          )
        })
      }

    </div>
  )
}


export default Comments