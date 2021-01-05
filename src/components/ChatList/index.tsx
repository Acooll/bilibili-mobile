import React, { useEffect, useRef } from 'react'
import './style.styl'




const ChatList = (props) => {
  const { chatData } = props
  const chatRef = useRef(null);

  useEffect(() => {
    console.log(chatData)
     if (!chatData.length) return;
    const msg = chatData[0];
    const div = document.createElement('div');
    switch (msg.cmd) {
      case 'DANMU_MSG':
        const manager = msg.info[2][2] === 1 ? `<span class='manager'>房管</span>`:"";
        const styleColor = msg.info[2][7]
        div.innerHTML =  `${manager}<span class='uname' style='color:${styleColor}'>${msg.info[2][1]}：</span><span class='content'>${msg.info[1]}</span>`
        break;
      default:
    }

    setTimeout(() => {
      let needScorll = true;
      console.log((chatRef as any).current.scrollTop,(chatRef as any).current.clientHeight);
      (chatRef as any).current.appendChild(div)

    }, 300)

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
