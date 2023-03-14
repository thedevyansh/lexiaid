import React from 'react';
import { Box } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import './styles.css';

import { Navigation } from 'swiper';

function CarouselResponse() {
  return (
    <Box flex='1' h='400px' w='600px' border='1px'>
      <Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
    </Box>
  );
}

export default CarouselResponse;
