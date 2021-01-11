import React, { useEffect, useState } from 'react'
import * as actionTypes from '../../store/actions';
import { connect } from "react-redux";
import { Helmet } from 'react-helmet'
import Header from '../../components/Header'
import './style.styl'
import axios from 'axios'
import LazyLoad from 'react-lazyload'
import { tenThousand } from '../../util'


const LivesArea = (props) => {


  const type = props.location.search.match(/\d+/)
  const [areas, setAreas] = useState([])
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [loadWord, setLoadWord] = useState('请给我更多~')
  const [loadMore, setLoadMore] = useState(false)
  useEffect(() => {
    if (type !== null) {
      console.log(list)
      axios.get(`/live/room/v3/Area/getRoomList?parent_area_id=${type}&area_id=&sort_type=online&page=${page}&page_size=30`).then(res => {
        setLoadWord('请给我更多~')
        setLoadMore(true)
        if (page > 1) {
          setList(list.concat(res.data.data.list))
        } else {
          setList(res.data.data.list)
        }
      })
    } else {
      axios.get('/live/room/v1/AppIndex/getAreas?device=phone&platform=ios&scale=3&build=3939').then(res => {
        setAreas(res.data.data)
      })
    }
    // eslint-disable-next-line
  }, [Number(type), page])

  return (
    <div>
      <Helmet>
        <title>Bilibili-( ゜- ゜)つロ干杯~-直播分类</title>
      </Helmet>
      <Header />
      <div className='liveBar'>
        <div>首页</div>
        <div>频道</div>
        <div className='live'>直播</div>
        <div>排行</div>
        <div>我的</div>
      </div>
      {
        !type ?
          <div className='typeArea'>
            <div className='allTypes'>全部分类</div>
            <div className='eachType'>
              {
                areas.map(item => {
                  return (
                    <div key={(item as any).id} className='item' onClick={() => props.history.push(`/lives_area?id=${(item as any).id}`)}>
                      <LazyLoad>
                        <img src={(item as any).entrance_icon.src} alt="" />
                      </LazyLoad>

                      <div>{(item as any).name}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          :
          <>
            <div className='itemContent'>
              {
                list.map(item => {
                  return (
                    <div key={(item as any).uid} className='liveItem' onClick={() => props.history.push(`/live_room?roomid=${(item as any).roomid}`)}>
                      <div>
                        <LazyLoad placeholder={<img width="100%" height="100%" src='http://s1.hdslb.com/bfs/static/blive/live-web-h5/static/images/img_loading.a3516567.png' alt="m" />}>
                          <img src={(item as any).cover} alt="" />
                        </LazyLoad>
                        <div className='playedInfo'>
                          <span >
                            <span className='numInfo'>
                              {(item as any).uname}
                            </span>
                          </span>
                          <span className='live-info_online-1YtP4'>
                            <span className='numInfo'>
                              {tenThousand((item as any).online)}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className='liveTitle'>{(item as any).title}</div>
                    </div>
                  )
                })
              }
            </div>
            {
              loadMore ? <div className='giveMore' onClick={() => { setLoadWord('加载中。。。'); setPage(page + 1) }}>{loadWord}</div> : null
            }


          </>
      }

    </div>
  )
}


export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return {
      getLiveListDispatch() {
        dispatch(actionTypes.fetchLiveList())
      },
      getAllLiveListDispatch() {
        dispatch(actionTypes.fetchAllLiveList())
      }

    };
  }
)(LivesArea);