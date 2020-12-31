import React, { useState } from 'react'
import './style.styl'


const SearchDetail = (props) => {
  const {searchList} = props;
  const [showUp, setShowUp] = useState(false)
  const [chooseType, setChooseType] = useState(0)

  const tab = [
    { id: 0, title: '默认排序' },
    { id: 1, title: '播放多' },
    { id: 2, title: '新发布' },
    { id: 3, title: '弹幕多' }
  ]

  return (
    <div className='searchContent'>
      <div className='searchTab'>
        <div> <span onClick={() => setShowUp(false)} className={showUp ? '' : 'selected'}>综合</span></div>
        <div><span onClick={() => setShowUp(true)} className={showUp ? 'selected' : ''} >up主</span></div>
      </div>
      <div className='chooseType'>
        {
          tab.map(item => {
            return (
              <div key={item.id}>
                <span onClick={() => { setChooseType(item.id) }} className={chooseType === item.id ? 'selectedType' : ''}>{item.title}</span>
              </div>
            )
          })
        }
      </div>
      <div className='contentList'>
        {
          searchList.map(item=>{
            return(
              <div className='listItem' key={item.aid}>
              <div>
                <img src={item.pic} alt=""/>
              </div>
              <div className='listRight'>
                <div className='title' dangerouslySetInnerHTML={{ __html: item.title}}></div>
                <div></div>
                <div></div>
              </div>
            </div>
            )
          })
        }
       
      </div>
    </div>
  )
}



export default SearchDetail