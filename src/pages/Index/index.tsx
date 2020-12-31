import React, { useEffect} from 'react'
import * as actionTypes from '../../store/actions';
import Header from '../../components/Header'
import Swiper from '../../components/Swiper/index'
import './style.styl'
import { connect } from "react-redux";
import Recommend from '../../components/Recommend'
import MenuBar from '../../components/MenuBar'

const Index = (props) => {
  const { getBannerListDispatch, banners, recommendList, getRecommendListDispatch } = props

  useEffect(() => {
    if (!banners.length) {
      getBannerListDispatch()
    }
    if (!recommendList.length) {
      getRecommendListDispatch()
    }
  }, [])

  return (
    <div className='container'>
      <Header />
      <MenuBar />
      <div className='swiper_container'>
        <Swiper bannerList={banners} />
      </div>
      <div className='recommend'>
        <Recommend recommendList={recommendList} />
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
      getBannerListDispatch() {
        dispatch(actionTypes.getBannerList())
      },
      getRecommendListDispatch() {
        dispatch(actionTypes.getRecommendList())
      },
    };
  }
)(Index);
