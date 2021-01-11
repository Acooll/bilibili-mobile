import React, { useEffect } from 'react'
import * as actionTypes from '../../store/actions';
import Header from '../../components/Header'
import Swiper from '../../components/Swiper/index'
import './style.styl'
import { connect } from "react-redux";
import Recommend from '../../components/Recommend'
import MenuBar from '../../components/MenuBar'
import { Helmet } from "react-helmet";
import Loading from '../../components/Loading'

const Index = (props) => {
  const { getBannerListDispatch, banners, recommendList, getRecommendListDispatch, loading } = props
  useEffect(() => {
    if (!banners) {
      getBannerListDispatch()
    }
    if (!recommendList.length) {
      getRecommendListDispatch()
    }
  }, [banners,getBannerListDispatch,getRecommendListDispatch,recommendList])

  return (
    <div className='container'>
      <Helmet>
        <title>Bilibili-( ゜- ゜)つロ干杯~</title>
      </Helmet>
      <Header />
      <MenuBar history={props.history} chooseId={0} />
      <div className='swiper_container'>
        <Swiper bannerList={banners} />
      </div>
      <div className='recommend'>
        {
          loading ? <Loading /> : null
        }
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
