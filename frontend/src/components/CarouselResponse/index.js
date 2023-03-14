import React from 'react';
import { Image } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

import { Navigation, Pagination } from 'swiper';

function CarouselResponse({ modelResponse }) {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <Swiper
      pagination={pagination}
      navigation={true}
      modules={[Pagination, Navigation]}
      className='mySwiper'>
      {modelResponse.map((image, index) => (
        <SwiperSlide key={index}>
          <Image src={image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CarouselResponse;
