import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

import { Navigation, Pagination } from 'swiper';

function CarouselResponse({modelResponse}) {
  return (
    <Swiper
      pagination={{
        type: 'fraction',
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className='mySwiper'>
      <SwiperSlide>Image 1</SwiperSlide>
      <SwiperSlide>Image 2</SwiperSlide>
      <SwiperSlide>Image 3</SwiperSlide>
      <SwiperSlide>Image 4</SwiperSlide>
    </Swiper>
  );
}

export default CarouselResponse;
