import React, { useEffect, useState } from 'react'
import IconSearch from '../../assets/searchIcon.png'
import * as actionTypes from '../../store/actions';
import './style.styl'
import axios from 'axios'
import { connect } from "react-redux";
import SearchDetail from '../../components/SeachDetail'

import { Helmet } from "react-helmet";

const URL_HOT = 'https://s.search.bilibili.com/main/hotword'

const Search = (props) => {
  const { searchList, getSearchListDispatch, history, searchSuggest, getSearchSuggestDispatch } = props

  const [searchWords, setSearchWords] = useState('')
  const [hotWords, setHotWords] = useState([])
  const [showContent, setShowContent] = useState(false)
  const [showList, setShowList] = useState(false)

  const back = () => {
    window.history.back()
  }
  useEffect(() => {
    if (!hotWords.length) {
      axios.get(URL_HOT).then(res => {
        setHotWords(res.data.list.slice(0, 7))
      })
    }
  }, [hotWords.length])


  // useEffect(() => {
  //   getSearchListDispatch(searchWords)
  //   console.log(searchList)
  // }, [searchWords])

  const handleChange = (e) => {
    setSearchWords(e.target.value)
    if (e.target.value === '') {
      setShowContent(false)
      setShowList(false)
    } else {
      setShowList(true)
      getSearchListDispatch(e.target.value)
      getSearchSuggestDispatch(e.target.value)
    }
  }

  const setSearchContent = (e) => {
    if (e.keyCode === 13 && searchWords !== '') {
      setShowContent(true)
    }
  }

  const setSearch = (e) => {
    getSearchListDispatch(e)
    setShowContent(true)
  }

  return (
    <div>
      <Helmet>
        <title>Bilibili-( ゜- ゜)つロ干杯~-搜索</title>
      </Helmet>
      <div className='searchHeader'>
        <div className='searchBar'>
          <img src={IconSearch} alt="" />
          <input onKeyDown={setSearchContent} className='searchInput' value={searchWords} onChange={handleChange} placeholder="搜索视频、UP主或AV号" type="text" />
        </div>
        <div className='cancel' onClick={back}>取消</div>
      </div>

      <div>
        {
          showContent ? <SearchDetail searchList={searchList} history={history} /> :
            <>
              <div className='hotSearch'>
                <div className='hotTitle'>大家都在搜</div>
                <div className='hotList'>
                  {
                    hotWords.length ?
                      hotWords.map(item => {
                        return (
                          <div className='hotItem' key={(item as any).id} onClick={() => setSearch((item as any).keyword)}>
                            {(item as any).keyword}
                          </div>
                        )
                      }) : null
                  }
                </div>
              </div>
              {
                showList ? <div className='searchList'>
                  {
                    searchSuggest.map((item, i) => {
                      return (
                        <div key={i} onClick={(e) => setSearch(item.value)} >
                          {item.value}
                        </div>
                      )
                    })
                  }
                </div> : null
              }

            </>
        }
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
      getSearchListDispatch(props) {
        dispatch(actionTypes.fetchSearchList(props))
      },
      getSearchSuggestDispatch(props) {
        dispatch(actionTypes.fetchSearchSuggest(props))
      },
    };
  }
)(Search);
