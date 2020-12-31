import React, { useEffect, useState } from 'react'


import './style.styl'

import IconArrowDown from '../../assets/arrow_down.png'
import IconArrowUp from '../../assets/arrow_up.png'
import classNames from 'classnames'


const menuList = [
  {
    id: 1, title: '首页'
  },
  { id: 2, title: '动画' },
  { id: 3, title: '国创' }, {
    id: 4, title: '音乐'
  }, { id: 5, title: '舞蹈' }, {
    id: 6, title: '游戏'
  }, {
    id: 7, title: '游戏'
  }
]




const MenuBar: React.FC = (props) => {

  let currentIndex = 0

  const [showBox, setShowBox] = useState(false)
  

  return (
    <div className='bar_container'>
      
      <div className='menu_bar'>
        <div className='menu'>
          {menuList.map((item, i) => (
            <div key={item.id} className={classNames(currentIndex === i ? 'activeMenu' : '')}>
              {item.title}
            </div>
          ))}
        </div>
        <div className='arrow'>
          <img src={IconArrowDown} onClick={() => setShowBox(true)} />
        </div>
      </div>
      <div className={classNames('wrapper', showBox ? 'showWrapper' : '')}>
        <div className='wrapper_box'>
          {menuList.map((item, i) => (
            <div key={item.id} className={classNames(currentIndex === i ? 'activeMenu' : '')}>
              {item.title}
            </div>
          ))}
        </div>
        <img className='icon_up' src={IconArrowUp} onClick={() => setShowBox(false)} />
      </div>
    </div>
  )
}



export default MenuBar