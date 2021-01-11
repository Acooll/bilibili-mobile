import React, { useState, useEffect } from 'react'
import "swiper/dist/css/swiper.css"
import Swiper from 'swiper'
import './style.styl'
import LazyLoad from 'react-lazyload'

const Slider = (props) => {
  const [sliderSwiper, setSliderSwiper] = useState(null)

  const { bannerList } = props

  useEffect(() => {
    if (bannerList && !sliderSwiper) {
      let sliderSwiper = new Swiper(".slider-container", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: { el: '.swiper-pagination' },
      });
      setSliderSwiper(sliderSwiper);
    }
  }, [bannerList, sliderSwiper])

  return (
    <div className="slider-container">
      <div className="swiper-wrapper">
        {bannerList ?
          bannerList.map((slider, i) => {
            return (
              <div className="swiper-slide" key={slider.id}>
                <div className="slider-nav">
                  <LazyLoad placeholder={<img width="100%" height="100%" src='http://s1.hdslb.com/bfs/static/blive/live-web-h5/static/images/img_loading.a3516567.png' alt="m" />}>
                    <img src={slider.pic} width="100%" height="100%" alt='' />
                  </LazyLoad>
                </div>
              </div>
            )
          }) : null
        }

      </div>
      <div className="swiper-pagination"></div>

    </div>
  )
}


export default Slider