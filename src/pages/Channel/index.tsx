import React, { useEffect } from 'react'
import * as actionTypes from '../../store/actions';
import Header from '../../components/Header'

import './style.styl'
import { connect } from "react-redux";

import MenuBar from '../../components/MenuBar'
import ChannelList from '../../components/ChannelList'
import ChatList from '../../components/ChatList';

const Channel = (props) => {
  const { location, region, getRegionDispatch,history } = props
  const rid = location.search.match(/\d+/)

  useEffect(() => {
    console.log(321)
    getRegionDispatch(rid)
  }, [])

const fetchData = (props) =>{
  console.log(props)
  getRegionDispatch(rid)
}

  return (
    <div className='container'>
      <Header  />
      <MenuBar history={history}  chooseId={Number(rid)} fetchData={fetchData} />
      <ChannelList  region={region} history={history} />
    </div>
  )
}



export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return {
      getRegionDispatch(props) {
        dispatch(actionTypes.fetchRegion(props))
      },
    };
  }
)(Channel);
