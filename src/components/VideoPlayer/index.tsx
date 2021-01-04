import React, { useEffect, useRef, useState } from 'react'
import './style.styl'
import ReactPlayer from 'react-player'
import * as Hls from "hls.js";
import IconPlay from '../../assets/tv-play.png'
import IconPause from '../../assets/tv-pause.png'
import IconBarrageOn from '../../assets/barrage-on.png'
import IconBarrageOff from '../../assets/barrage-off.png'
import IconFullScreen from '../../assets/fullscreen.png'
import BarDot from '../../components/BarDot'
import { debounce, throttle } from '../../util'


const VideoPlayer = (props) => {

  const { playerUrl, isLive, closePic, danmu } = props
  const videoRef = useRef(null)
  const danmuRef = useRef(null)
  const controlRef = useRef(null)
  const bottomControlRef = useRef(null)
  const barRef = useRef(null)
  const dotRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [barrageOn, setBarrageOn] = useState(false)
  let barrageTimer

  const domPool: any[] = []
  const danmuPool: any[] = []
  const MAX_DANMU_COUNT = 6
  let start = 0



  useEffect(() => {
    if (barrageOn && playing) {
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

  }, [barrageOn, playing])



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

    // console.log(danmuPool, 'pool')
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
    (bottomControlRef as any).current.style.display = 'none'
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
          setPlaying(true)
          // setTimeout(() => {
          //   (controlRef as any).current.style.display = 'none'
          // }, 3000)
        })

      }
    } else if (playerUrl.length) {
      initVideo()
    }

    // return()=>  (videoRef as any).current.removeEventListener('timeupdate')
  }, [playerUrl])



  const initVideo = () => {
    const bar = barRef.current;
    const dot = dotRef.current;
    const video = videoRef.current;
    (videoRef as any).current.addEventListener('timeupdate', () => {
      const progress = ((videoRef as any).current.currentTime * 1000) / playerUrl.length * 100;
      (bar as any).style.width = `${progress}%`;
      (dot as any).style.marginLeft = `${progress / 2.22}vw`;
    });

    /**
      * 进度条事件
      */
    // 总进度条宽度
    let width = 0;
    // 距离屏幕左边距离
    let left = 0;
    // 拖拽进度比例
    let rate = 0;
    (dotRef as any).current.addEventListener('touchstart', (e) => {
      e.stopPropagation()
      const parentDOM = (dot as any).parentElement;
      width = parentDOM.offsetWidth;
      left = parentDOM.getBoundingClientRect().left;
      (video as any).pause()
    });

    (dotRef as any).current.addEventListener('touchmove', (e) => {
      e.preventDefault()
      const touch = e.touches[0];
      // 计算拖拽进度比例
      rate = (touch.clientX - left) / width;
      if (rate > 1) {
        rate = 1;
      } else if (rate < 0) {
        rate = 0;
      }
      // const currentTime = (video as any).duration * rate;
      (dot as any).style.marginLeft = `${rate * 100}%`;
      (bar as any).style.width = `${rate * 100}%`;
    });
    (dotRef as any).current.addEventListener("touchend", () => {
      (video as any).currentTime = (video as any).duration * rate;
      
      (video as any).play()
    });

  }

  const changePlay = (e) => {
    e.stopPropagation();
    const videoDom = videoRef.current;

    if (playing) {
      setPlaying(false);
      (videoDom as any).pause();

    } else {
      if (!isLive) {
        (bottomControlRef as any).current.style.display = 'block'
        closePic(true)
      }
      setTimeout(() => {
        (controlRef as any).current.style.display = 'none'
      }, 5000)
      setPlaying(true);
      (videoDom as any).play()
    }
  }

  let timer

  const toggleShowControls = () => {
    clearTimeout(timer)
    if ((controlRef as any).current.style.display === 'none') {
      (controlRef as any).current.style.display = 'block'
      // timer = setTimeout(() => {
      //   if (playing) {
      //     (controlRef as any).current.style.display = 'none'
      //   }
      // }, 5000)
    } else {
      (controlRef as any).current.style.display = 'none'
    }
  }

  // useEffect(() => {

  //   return () => clearTimeout(timer)
  // }, [playing])

  return (
    <div className='video_wrapper' >
      <div className='videoContainer' onClick={debounce(toggleShowControls, 200)}>
        <div className='danmuContainer' ref={danmuRef}></div>
        <video
          src={isLive ? '' : playerUrl.url}
          // controls={isLive ? false : true}
          ref={videoRef} height="100%" width="100%" preload="auto"
          x5-playsinline="true"
          webkit-playsinline="true"
        />
        <div className='control' ref={controlRef}>
          <img className='control-play' src={playing ? IconPause : IconPlay} onClick={changePlay} alt="" />
          <div className='bottom-control' ref={bottomControlRef} >
            <div className='barContainer'>
              <div className='barDot' ref={dotRef}  >
              </div>
              <div className='allBar'>
                <div className='activeBar' ref={barRef}></div>
              </div>
            </div>
            <img onClick={toggleSend} className='icon-barrage' src={barrageOn ? IconBarrageOn : IconBarrageOff} alt="" />
            <img className='icon-fullscreen' src={IconFullScreen} alt="" />
          </div>


        </div>

      </div>

    </div>

  )
}


export default VideoPlayer