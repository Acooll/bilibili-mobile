import React from 'react'
import './style.styl'
import ReactPlayer from 'react-player'


const VideoPlayer = (props) => {

  const {playerUrl} = props

  console.log(111,playerUrl)

  return (
    <div className='video_wrapper'>
   
        <ReactPlayer className='player' 
         width='100%' height='100%'
         playing
         controls
        url={playerUrl}
        >
        </ReactPlayer>
    </div>

  )
}


export default VideoPlayer