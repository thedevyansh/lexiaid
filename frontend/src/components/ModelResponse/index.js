import { Flex, Image } from '@chakra-ui/react';
import CarouselResponse from '../CarouselResponse';
import { RotatingLines } from 'react-loader-spinner';
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
      {!modelResponse ? (
        <RotatingLines
          strokeColor='#36B6FF'
          strokeWidth='4'
          animationDuration='0.75'
          width='40'
          visible={true}
        />
      ) : (
        <CarouselResponse modelResponse={modelResponse} />
      )}
    </Flex>
  );
}

export default ModelResponse;
