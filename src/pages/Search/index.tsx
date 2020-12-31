import React, { useEffect, useState } from 'react'
import IconSearch from '../../assets/searchIcon.png'
import * as actionTypes from '../../store/actions';
import './style.styl'
import axios from 'axios'
import { connect } from "react-redux";
import SearchDetail from '../../components/SeachDetail'
const URL_HOT = 'https://s.search.bilibili.com/main/hotword'



const Search = (props) => {
  const { searchList, getSearchListDispatch } = props

  const [searchWords, setSearchWords] = useState('')
  const [hotWords, setHotWords] = useState([])
  const [showContent, setShowContent] = useState(false)
  const [showList, setShowList] = useState(false)

  const back = () => {
    props.history.push('/index')
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
      getSearchListDispatch(searchWords)
    }
  }

  const setSearchContent = (e) => {
    if (e.keyCode === 13 && searchWords !== '') {
      setShowContent(true)
    }
  }

  return (
    <div>
      <div className='searchHeader'>
        <div className='searchBar'>
          <img src={IconSearch} alt="" />
          <input onKeyDown={setSearchContent} className='searchInput' value={searchWords} onChange={handleChange} placeholder="搜索视频、UP主或AV号" type="text" />
        </div>
        <div className='cancel' onClick={back}>取消</div>
      </div>


      <div>
        {
          showContent ? <SearchDetail searchList={searchList} /> :
            <>
              <div className='hotSearch'>
                <div className='hotTitle'>大家都在搜</div>
                <div className='hotList'>
                  {
                    hotWords.length ?
                      hotWords.map(item => {
                        return (
                          <div className='hotItem' key={(item as any).id}>
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
                    searchList.map(item => {
                      return (
                        <div key={item.aid}>
                          {item.author}
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

    };
  }
)(Search);
