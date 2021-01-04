import React, { useEffect } from 'react'
import './style.styl'
import {timestampToTime} from '../../util'
import IconZan from '../../assets/zan.png'


const Comments = (props) => {
  const { comments } = props
  useEffect(() => {
    console.log(comments)
  }, [comments])
  return (
    <div className='commentsContainer'>

      {
        comments.map(item => {
          return (
            <div className='comments' key={item.rpid}>
              <div className='creatorInfo'>
                <div className='avatar'><img src={item.member.avatar} alt=""/></div>
                <div className='uname-date'>
                  <div>{item.member.uname}</div>
                  <div>{timestampToTime(item.ctime).substring(0,9)}</div>
                </div>
                <div className='iconfonts'><img src={IconZan} alt=""/> <span>{item.like}</span> </div>
              </div>
              <div className='creatorSays'>
                {item.content.message.replace(/item.content.emote.text/g,'~')}
              </div>
            </div>
          )
        })
      }

    </div>
  )
}


export default Comments