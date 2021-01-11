import { useEffect, useRef, useState } from 'react'
import './style.styl'
import * as Hls from "hls.js";
import IconPlay from '../../assets/tv-play.png'
import IconPause from '../../assets/tv-pause.png'
import IconBarrageOn from '../../assets/barrage-on.png'
import IconBarrageOff from '../../assets/barrage-off.png'
import IconFullScreen from '../../assets/fullscreen.png'
import { debounce } from '../../util'



const VideoPlayer = (props) => {

  const { playerUrl, isLive, closePic, danmu } = props
  const videoRef = useRef(null)
  const playerRef = useRef(null)
  const danmuRef = useRef(null)
  const controlRef = useRef(null)
  const bottomControlRef = useRef(null)
  const barRef = useRef(null)
  const dotRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [barrageOn, setBarrageOn] = useState(false)
  let barrageTimer
  let time
  let timer

  const domPool: any[] = []
  let danmuPool: any[] = []
 



  useEffect(() => {
    setBarrageOn(Boolean(Number(window.localStorage.getItem('barrageOn'))))
    if (barrageOn && playing) {
      init()
      // eslint-disable-next-line
      barrageTimer = setInterval(() => {
        if (domPool.length) {
          let dom = domPool.shift()
          danmuPool.shift()
          // console.log('im send', domPool, dom);
          sendDanmu(dom)
        } else {
          init()
        }
      }, 300)
    }
    return () => clearInterval(barrageTimer)

  }, [barrageOn, playing, domPool])



  const init = () => {
    // console.log(danmu, 889)
    let dom = document.querySelectorAll('.danmu')
    if (dom.length) {
      for (let i = 0; i < dom.length; i++) {
        dom[i].addEventListener('transitionend', () => {
          dom[i].remove()
        })
      }
    }

    if (!isLive) {
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
    } else {
      danmuPool = danmu
      // console.log(danmuPool, 121121, danmu)
    }
    if (danmuPool.length) {
      // console.log(56511111111111111111111)
      for (let i = 0; i < danmuPool.length; i++) {
        let div = document.createElement('div')
        div.className = 'danmu'
        isLive ? div.innerHTML = danmuPool[0].info[1] : div.innerHTML = danmuPool[i].content;
        isLive ? div.style.color = "#" + Number(danmuPool[0].info[0][3]).toString(16) : div.style.color = "#" + Number(danmuPool[i].decimalColor).toString(16)
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
      window.localStorage.setItem('barrageOn', '0')
    } else {
      setBarrageOn(true)
      window.localStorage.setItem('barrageOn', '1')
    }
  }

  const sendDanmu = (dom) => {
    const x = dom.offsetLeft + dom.clientWidth
    dom.style.transform = `translateX(${-x}px)`
    if (isLive) {
      dom.style.transition = `all 5s linear`
    } else {
      dom.style.transition = `all ${Math.round(1500 / x)}s linear`
    }

  }



  useEffect(() => {
    (bottomControlRef as any).current.style.display = 'none';
    let dom = videoRef.current;


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
      (dom as any).addEventListener('timeupdate', handleUpdate)
      initVideo()
    }

    return () => (dom as any).removeEventListener('timeupdate', handleUpdate)
    // eslint-disable-next-line
  }, [playerUrl])


  const handleUpdate = () => {
    const bar = barRef.current;
    const dot = dotRef.current;
    const progress = ((videoRef as any).current.currentTime * 1000) / playerUrl.length * 100;
    (bar as any).style.width = `${progress}%`;
    (dot as any).style.marginLeft = `${progress / 2.22}vw`;

  }


  const initVideo = () => {
    const bar = barRef.current;
    const dot = dotRef.current;
    const video = videoRef.current;
    // (videoRef as any).current.addEventListener('timeupdate', () => {
    //   const progress = ((videoRef as any).current.currentTime * 1000) / playerUrl.length * 100;
    //   (bar as any).style.width = `${progress}%`;
    //   (dot as any).style.marginLeft = `${progress / 2.22}vw`;

    // });

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


    (video as any).addEventListener('ended', () => {
      (video as any).currentTime = 0;
      (video as any).pause();
      setPlaying(false)
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


  useEffect(() => {
    let dom = playerRef.current;
    if (playerUrl) {
      (dom as any).addEventListener('click', handleChangePlay)
    }

    return () => {
      clearTimeout(time)
    }
    // eslint-disable-next-line
  }, [playerUrl, playing])

  // const handleClear = () =>{
  //   clearTimeout(time)
  // }

  const handleChangePlay = (e) => {
    clearTimeout(time)
    e.stopPropagation();
    const videoDom = videoRef.current;

    if (playing) {
      console.log('false')
      setPlaying(false);
      (videoDom as any).pause();

    } else {
      (bottomControlRef as any).current.style.display = 'block';
      if (!isLive) {
        closePic(true)
      }
      // time = setTimeout(() => {
      //   (controlRef as any).current.style.display = 'none'
      // }, 5000)
      setPlaying(true);
      (videoDom as any).play()
    }
  }



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
          ref={videoRef} height="100%" width="100%" preload="auto"
          x5-playsinline="true"
          webkit-playsinline="true"
        />
        <div className='control' ref={controlRef}>
          <img className='control-play' src={playing ? IconPause : IconPlay} ref={playerRef} alt="" />
          <div className='bottom-control' ref={bottomControlRef} >

            {
              isLive ? null :
                <div className='barContainer' >
                  <div className='barDot' ref={dotRef}  >
                  </div>
                  <div className='allBar'>
                    <div className='activeBar' ref={barRef}></div>
                  </div>
                </div>
            }

            <img onClick={toggleSend} className='icon-barrage' src={barrageOn ? IconBarrageOn : IconBarrageOff} alt="" />
            <img className='icon-fullscreen' src={IconFullScreen} alt="" />
          </div>
        </div>

      </div>

    </div>

  )
}


export default VideoPlayer