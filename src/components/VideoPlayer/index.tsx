import React, { useEffect, useRef, useState } from 'react'
import './style.styl'
import ReactPlayer from 'react-player'
import * as Hls from "hls.js";
import IconPlay from '../../assets/tv-play.png'
import IconPause from '../../assets/tv-pause.png'
import IconBarrageOn from '../../assets/barrage-on.png'
import IconBarrageOff from '../../assets/barrage-off.png'
import IconFullScreen from '../../assets/fullscreen.png'




const VideoPlayer = (props) => {

  const { playerUrl, isLive, closePic, danmu } = props
  const videoRef = useRef(null)
  const danmuRef = useRef(null)
  const [played, setPlayed] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [barrageOn, setBarrageOn] = useState(false)
  let barrageTimer

  const domPool: any[] = []
  const danmuPool: any[] = []
  const MAX_DANMU_COUNT = 6
  let start = 0



  useEffect(() => {
    console.log(333)
    if (barrageOn) {
      init()
      barrageTimer = setInterval(() => {
        if (domPool.length) {
          let dom = domPool.shift()
          sendDanmu(dom)
        } else {
          start += 6
          init()
        }
      }, 200)
    }
    return () => clearInterval(barrageTimer)

  }, [barrageOn])



  const init = () => {
    let dom = document.querySelectorAll('.danmu')
    if (dom.length) {
      for (let i = 0; i < dom.length; i++) {
        dom[i].addEventListener('transitionend', () => {
          dom[i].remove()
        })
      }
    }


    const indexs: any[] = []

    danmu.forEach((item, i) => {
      if (parseInt(item.time, 10) === parseInt((videoRef as any).current.currentTime, 10)) {
        danmuPool.push(item)
        indexs.push(i)
      }
    })

    indexs.forEach((index, i) => {
      danmu.splice(index - i, 1)
    })

    console.log(danmuPool, 'pool')
    if (danmuPool.length) {
      for (let i = 0; i < danmuPool.length; i++) {
        let div = document.createElement('div')
        div.className = 'danmu'
        div.innerHTML = danmuPool[i].content;
        div.style.color = "#" + Number(danmuPool[i].decimalColor).toString(16)
        div.style.position = 'absolute'
        div.style.top = `${Math.random() * 30}vw`
        div.style.marginLeft = '100vw'
        div.style.overflow = 'hidden'
        div.style.whiteSpace = 'nowrap'
        div.style.width = 'mint-width';
        (danmuRef as any).current.append(div);
        domPool.push(div)
      }
    }

  }

  async function clearBarrage() {
    (danmuRef as any).current.removeChild(await document.querySelectorAll('.danmu'))
  }


  const toggleSend = (e) => {
    e.stopPropagation()
    if (barrageOn) {
      setBarrageOn(false)
    } else {
      setBarrageOn(true)
    }
  }

  const sendDanmu = (dom) => {
    const x = dom.offsetLeft + dom.clientWidth
    dom.style.transform = `translateX(${-x}px)`
    dom.style.transition = `all ${Math.round(1500 / x)}s linear`
  }

  useEffect(() => {
    if (isLive && playerUrl.length) {
      const videoDom = videoRef.current
      const videoSrc = playerUrl[3].url
      if ((videoDom as any).canPlayType('application/vnd.apple.mpegurl')) {
        (videoDom as any).src = videoSrc;
      } else if ((Hls as any).isSupported()) {
        var hls = new (Hls as any)();
        hls.loadSource(videoSrc);
        hls.attachMedia(videoDom);

        (videoDom as any).addEventListener('canplay', () => {
          (videoDom as any).play()
          setPlayed(true)
          setTimeout(() => {
            setShowControls(false)
          }, 3000)
        })

      }
    }
  }, [playerUrl])

  const changePlay = (e) => {
    e.stopPropagation()
    const videoDom = videoRef.current
    if (played) {
      setPlayed(false);
      (videoDom as any).pause()
    } else {
      if (!isLive) {
        closePic(true)
      }
      setPlayed(true);
      (videoDom as any).play()
    }
  }

  const toggleShowControls = () => {
    // console.log(barrageTimer)
    // clearInterval(barrageTimer)
    if (showControls) {
      setShowControls(false)
    } else {
      setShowControls(true)
      setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  return (
    <div className='video_wrapper' >
      <div className='videoContainer' onClick={toggleShowControls}>
        <div className='danmuContainer' ref={danmuRef}></div>
        <video
          src={isLive ? '' : playerUrl}
          // controls={isLive ? false : true}
          ref={videoRef} height="100%" width="100%" preload="auto"
          x5-playsinline="true"
          webkit-playsinline="true"
        />
        {
          showControls ? <div className='control' >
            <img className='control-play' src={played ? IconPause : IconPlay} onClick={changePlay} alt="" />
            <div className='bottom-control'>
              <img onClick={toggleSend} className='icon-barrage' src={barrageOn ? IconBarrageOn : IconBarrageOff} alt="" />
              <img  className='icon-fullscreen' src={IconFullScreen} alt="" />
            </div>
          </div> : null
        }

      </div>
      {/* <button onClick={send}>发送</button> */}

      {/* <ReactPlayer
            className='player'
            width='100%' height='100%'
            playing
            controls
            // autoPlay
            url={playerUrl}
          >           
          </ReactPlayer>
       */}
    </div>

  )
}


export default VideoPlayer