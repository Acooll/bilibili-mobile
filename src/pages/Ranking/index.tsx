import React, { useEffect, useRef, useState } from 'react'
import './style.styl'
import IconLeft from '../../assets/arrow_left.png'
import RankList from '../../components/RankList'
import * as actionTypes from '../../store/actions';
import { connect } from "react-redux";
import { Helmet } from 'react-helmet'
import Loading from '../../components/Loading'



const list = [
  { "tid": 0, "typename": "全站" },
  { "tid": 1, "typename": "动画" },
  { "tid": 168, "typename": "国创" },
  { "tid": 3, "typename": "音乐" },
  { "tid": 129, "typename": "舞蹈" },
  { "tid": 4, "typename": "游戏" },
  { "tid": 36, "typename": "知识" },
  { "tid": 188, "typename": "数码" },
  { "tid": 160, "typename": "生活" },
  { "tid": 211, "typename": "美食" },
  { "tid": 119, "typename": "鬼畜" },
  { "tid": 155, "typename": "时尚" },
  { "tid": 5, "typename": "娱乐" },
  { "tid": 181, "typename": "影视" },
  { "tid": 177, "typename": "纪录片" },
  { "tid": 23, "typename": "电影" },
  { "tid": 11, "typename": "电视剧" },
]
const Ranking = (props) => {
  const { rankingList, getRankingListDispatch, location, history, loading } = props
  const rid = location.search.match(/\d+/)
  const [chooseBar, setChooseBar] = useState(0)
  const barRef = useRef(null)



  useEffect(() => {
    const bar = barRef.current;
    setChooseBar(Number(rid))
    getRankingListDispatch(rid);

  }, [Number(rid)])


  return (
    <div className='rank_container'>
      <Helmet>
        <title>Bilibili-( ゜- ゜)つロ干杯~-排行榜</title>
      </Helmet>
      <div className='rank_header'>
        <img src={IconLeft} alt="" onClick={() => window.history.back()} />
        <div>排行榜</div>
      </div>
      <div className='barContainer' ref={barRef}>
        {list.map(item => (
          <div key={item.tid}
            className={chooseBar === item.tid ? 'activeMenu' : ''}
            onClick={() => history.push(`/ranking?rid=${item.tid}`)}
          >
            {item.typename}
          </div>
        ))}
      </div>
      <div>
        {
          loading ? <Loading /> : null
        }
        <RankList rankingList={rankingList} history={history} />
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
