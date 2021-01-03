import React, { useEffect } from 'react'
import * as actionTypes from '../../store/actions';
import Header from '../../components/Header'

import './style.styl'
import { connect } from "react-redux";

import MenuBar from '../../components/MenuBar'

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
      {/* <div className='channelContainer'>
        <div className='channelBar'>
        <div className='channelMenu'>
          {region.map(item => (
            <div key={item.aid}
          >
              {item.typename}
            </div>
          ))}
        </div>
        </div>
        <div></div>
      </div> */}
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
