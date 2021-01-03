import React from 'react'
import './style.styl'
import IconRight from '../../assets/right.png'

const LiveTypes = (props) => {

  const { liveList,history } = props

  return (
    <>
      {
        liveList.map((list,i) => {
          return (
            <div key={i} className='liveList'>
              <div className='topBg'></div>
              <div className='listContent'>
                <div className='contentTitle'>
                  <div className='title'>{list.module_info.title}</div>
                  <a href="">
                    <p>进去看看</p>
                    <img src={IconRight} alt="" />
                  </a>
                </div>
                <div className='itemContent'>
                  {
                    list.list.map((item,a) => {
                      return (
                        <div key={a} className='liveItem' onClick={()=>history.push(`/live_room?roomid=${item.roomid}`)}>
                          <div>
                            <img src={item.cover} alt="" />
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
        })
      }
    </>
  )
}


export default LiveTypes