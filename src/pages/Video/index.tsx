import React, { useEffect } from 'react'
import Header from '../../components/Header'
import VideoPlayer from '../../components/VideoPlayer'

import { connect } from "react-redux"
import * as actionTypes from '../../store/actions'

const Video = (props) => {
  const { location, playerUrl, getPlayUrlDispatch } = props
  const avid = location.search.match(/\d+/g)

  useEffect(() => {
      getPlayUrlDispatch(avid)
      
  }, [])

  return (
    <div>
      <Header />
      <div>
        <VideoPlayer playerUrl={playerUrl} />
      </div>
      <div>

      </div>
    </div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return {
      getPlayUrlDispatch(props) {
        dispatch(actionTypes.getPlayer(props))
      },
    };
  }
)(Video);
