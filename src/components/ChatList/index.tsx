import React, { useEffect, useRef } from 'react'
import './style.styl'




const ChatList = (props) => {
  const { chatData } = props
  const chatRef = useRef(null);

  useEffect(() => {
    console.log(chatData,111)
    // if (!chatData.length) return;
    const div = document.createElement('div');
    chatData.forEach(item => {
      switch (item.cmd) {
        case 'DANMU_MSG':
          const manager = item.info[2][2] === 1 ? `<span class='manager'>房管</span>` : "";
          const styleColor = item.info[2][7]
          div.innerHTML = `${manager}<span class='uname' style='color:${styleColor}'>${item.info[2][1]}：</span><span class='content'>${item.info[1]}</span>`
          break;
        // case 'SEND_GIFT':

        //   break;
        default:
        
      }
    })

    const timer = setTimeout(() => {
      let needScorll = true;
      // console.log((chatRef as any).current.scrollTop,(chatRef as any).current.clientHeight);
      (chatRef as any).current.appendChild(div)

    }, 100)

    return () => clearTimeout(timer)
  }, [chatData])

  return (
    <div className='chatWrapper'>
      <div className='chatContainer' ref={chatRef}>
        {/* <div className='chatItem'>
          <div>xxx:</div>
          <div>hello</div>
        </div> */}



      </div>
    </div>
  )
}



export default ChatList
