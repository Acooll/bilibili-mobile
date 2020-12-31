import React, { useState, useEffect } from 'react'
import "swiper/dist/css/swiper.css"
import Swiper from 'swiper'
import './style.styl'


const Slider = (props) => {
  const [sliderSwiper, setSliderSwiper] = useState(null)

  const { bannerList } = props

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
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
  }, [bannerList.length, sliderSwiper])

  return (
    <div className="slider-container">
      <div className="swiper-wrapper">
        {
          bannerList.map((slider, i) => {
            return (
              <div className="swiper-slide" key={slider.id}>
                <div className="slider-nav">
                  <img src={slider.pic} width="100%" height="100%" />
                </div>
              </div>
            )
          })
        }
        
      </div>
      <div className="swiper-pagination"></div>

    </div>
  )
}


export default Slider