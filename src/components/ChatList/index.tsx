import React, { useEffect, useRef } from 'react'
import './style.styl'




const ChatList = (props) => {
  const { chatData } = props
  const chatRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
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


      const clientHeight = (containerRef as any).current.clientHeight;
      const scrollHeight = (containerRef as any).current.scrollHeight;
      if (scrollHeight > clientHeight) {
        (containerRef as any).current.scrollTop = scrollHeight - clientHeight
      }

      (chatRef as any).current.appendChild(div)

    }, 100)

    return () => clearTimeout(timer)
  }, [chatData])

  return (
    <div className='chatWrapper' ref={containerRef}>
      <div className='chatContainer' ref={chatRef}>
      </div>
    </div>
  )
}



export default ChatList
