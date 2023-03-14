import { Flex, Image, Box } from '@chakra-ui/react';
import CarouselResponse from '../CarouselResponse';
import logo from './logo.png';

function ModelResponse() {
  return (
    <Flex columnGap={4}>
      <Image
        boxSize='35px'
        objectFit='cover'
        src={logo}
        fallbackSrc='https://via.placeholder.com/35'
      />
      <CarouselResponse />
    </Flex>
  );
}

export default ModelResponse;
