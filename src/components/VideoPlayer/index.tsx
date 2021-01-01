import React, { useEffect, useRef } from 'react'
import './style.styl'
// import ReactPlayer from 'react-player'
import * as Hls from "hls.js";

const VideoPlayer = (props) => {

  const { playerUrl, isLive } = props
  const videoRef = useRef(null)

  const current = setInterval(()=>{

  },3000)

  useEffect(() => {
  
      if(isLive && playerUrl.length){
        console.log(234,playerUrl)
        const videoDom = videoRef.current
        const videoSrc = playerUrl[3].url
        if ((videoDom as any).canPlayType('application/vnd.apple.mpegurl')) {
          (videoDom as any).src = videoSrc;
  
        } else if ((Hls as any).isSupported()) {
          var hls = new (Hls as any)();
          hls.loadSource(videoSrc);
          hls.attachMedia(videoDom);
        }
      }
   
  },[current])

  return (
    <div className='video_wrapper'>
      <video controls src={isLive ? '' : playerUrl} ref={videoRef} height="100%" width="100%" preload="auto"
        x5-playsinline="true"
        webkit-playsinline="true" />
      {/* <ReactPlayer
        //  ref={videoRef} 
        className='player'
        width='100%' height='100%'
        playing
        controls
      // url={playerUrl}
      >
      </ReactPlayer> */}
    </div>

  )
}


export default VideoPlayer