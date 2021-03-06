import React, { useEffect } from 'react'
import * as actionTypes from '../../store/actions';
import Header from '../../components/Header'
import {Helmet} from 'react-helmet'
import './style.styl'
import { connect } from "react-redux";

import MenuBar from '../../components/MenuBar'
import ChannelList from '../../components/ChannelList'


const Channel = (props) => {
  const { location, region, getRegionDispatch, history } = props
  const rid = location.search.match(/\d+/)

  useEffect(() => {
    getRegionDispatch(rid)
    // eslint-disable-next-line
  }, [Number(rid),getRegionDispatch])


  return (
    <div className='container'>
      <Helmet>
        <title>频道</title>
      </Helmet>
      <Header />
      <MenuBar history={history} chooseId={Number(rid)} />
      <ChannelList region={region} history={history} rid={rid} />
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
