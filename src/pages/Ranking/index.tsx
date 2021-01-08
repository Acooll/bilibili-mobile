import React, { useEffect } from 'react'
import  './style.styl'
import IconLeft from '../../assets/arrow_left.png'
import RankList from '../../components/RankList'
import * as actionTypes from '../../store/actions';
import { connect } from "react-redux";
import {Helmet} from 'react-helmet'
import Loading from '../../components/Loading'

const Ranking = (props) =>{
  const {rankingList,getRankingListDispatch,location,history,loading} = props
  const rid = location.search.match(/\d+/)

  useEffect(()=>{
    getRankingListDispatch(rid)
  },[])


  return(
    <div className='rank_container'>
      <Helmet>
        <title>Bilibili-( ゜- ゜)つロ干杯~-排行榜</title>
      </Helmet>
      <div className='rank_header'>
        <img src={IconLeft} alt=""  onClick={()=> window.history.back()} />
        <div>排行榜</div>
      </div>
      <div>
      {
          loading? <Loading />  : null
        }
        <RankList rankingList={rankingList}  history={history} />
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
      getRankingListDispatch(props) {
        dispatch(actionTypes.fetchRankingList(props))
      },
  }
}
)(Ranking);
