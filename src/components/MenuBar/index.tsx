import React, { useEffect, useState, useRef } from 'react'


import './style.styl'

import IconArrowDown from '../../assets/arrow_down.png'
import IconArrowUp from '../../assets/arrow_up.png'
import classNames from 'classnames'


const menuList = [
  { "tid": 0, "typename": "首页" },
  { "tid": 1, "typename": "动画" },
  { "tid": 13, "typename": "番剧" },
  { "tid": 168, "typename": "国创" },
  { "tid": 3, "typename": "音乐" },
  { "tid": 129, "typename": "舞蹈" },
  { "tid": 4, "typename": "游戏" }, {
    "tid": 36, "typename": "科技"
  },
  { "tid": 188, "typename": "数码" },
  { "tid": 160, "typename": "生活" },
  { "tid": 119, "typename": "鬼畜" },
  { "tid": 155, "typename": "时尚" },
  { "tid": 5, "typename": "娱乐" },
  { "tid": 181, "typename": "影视" },
  { "tid": 177, "typename": "纪录片" },
  { "tid": 23, "typename": "电影" },
  // { "tid": 11, "typename": "电视剧" },
  { "tid": 999, "typename": "直播" }
]



const MenuBar = (props) => {
  const { typeList, history, chooseId, fetchData } = props
  const [chooseBar, setChooseBar] = useState(0)

  const barRef = useRef(null)

  console.log(typeList)
  const [showBox, setShowBox] = useState(false)


  useEffect(() => {
    setChooseBar(chooseId)
  }, [chooseId])

  const selectRegion = (e) => {
    if (e === 0) {
      history.push('/index')
    } else {
      if (e === 999) {
        history.push('/lives')
      } else {
        if (fetchData !== undefined) {
          fetchData(true)
        }
        history.push(`/channel?tid=${e}`)
      }
    }
  }

  return (
    <div className='bar_container'>

      <div className='menu_bar'>
        <div className='menu' ref={barRef}>
          {menuList.map(item => (
            <div key={item.tid}
              className={classNames(chooseBar === item.tid ? 'activeMenu' : '')}
              onClick={selectRegion.bind(this, item.tid)}>
              {item.typename}
            </div>
          ))}
        </div>
        <div className='arrow'>
          <img src={IconArrowDown} onClick={() => setShowBox(true)} alt='' />
        </div>
      </div>
      <div className={classNames('wrapper', showBox ? 'showWrapper' : '')}>
        <div className='wrapper_box'>
          {menuList.map(item => (
            <div key={item.tid}
              className={classNames(chooseBar === item.tid ? 'activeMenu' : '')}
              onClick={selectRegion.bind(this, item.tid)}
            >
              {item.typename}
            </div>
          ))}
        </div>
        <img className='icon_up' src={IconArrowUp} onClick={() => setShowBox(false)} alt='' />
      </div>
    </div>
  )
}



export default MenuBar