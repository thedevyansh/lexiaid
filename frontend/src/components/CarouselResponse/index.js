import React from 'react';
import { Image, Text } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

import { Navigation, Pagination } from 'swiper';

function CarouselResponse({ modelResponse }) {
  return (
    <Swiper
      navigation={true}
      modules={[Pagination, Navigation]}
      className='mySwiper'>
      {modelResponse.images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image src={image} />
          <Text className='swiperImgSentence'>
            {modelResponse.sentences[index]}
          </Text>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CarouselResponse;
