import { Flex, Image } from '@chakra-ui/react';
import CarouselResponse from '../CarouselResponse';
import logo from './logo.png';

function ModelResponse({ modelResponse }) {
  return (
    <Flex columnGap={4}>
      <Image
        boxSize='35px'
        objectFit='cover'
        src={logo}
        fallbackSrc='https://via.placeholder.com/35'
      />
      <CarouselResponse modelResponse={modelResponse} />
    </Flex>
  );
}

export default ModelResponse;
