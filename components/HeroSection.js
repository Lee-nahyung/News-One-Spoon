import React from 'react';
import './HeroSection.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import foodtruckimg2 from '../assets/image5.jpg';
import foodtruckimg1 from '../assets/image4.jpg';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <Swiper
        spaceBetween={0} 
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="image-container"
      >
        {/* 첫 번째 이미지 슬라이드 */}
        <SwiperSlide>
          <img src={foodtruckimg1} alt="Food Truck 1" />
        </SwiperSlide>

        {/* 두 번째 이미지 슬라이드 */}
        <SwiperSlide>
          <img src={foodtruckimg2} alt="Food Truck 2" />
        </SwiperSlide>

        <SwiperSlide>
          <img src={foodtruckimg1} alt="Food Truck 1" />
        </SwiperSlide>
      </Swiper>

      <div className="hero-content">
      <p>상권정보를 활용한 푸드트럭 위치 선정 서비스</p>
        <h2>LET'S FIND THE RIGHT PLACE FOR YOU</h2>
      </div>
    </section>
  );
};

export default HeroSection;
