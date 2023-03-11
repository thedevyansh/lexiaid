import React from 'react';
import { Center } from '@chakra-ui/react';
import { RotatingLines } from 'react-loader-spinner';

function LoadingView() {
  return (
    <Center h='65vh'>
      <RotatingLines
        strokeColor='#36B6FF'
        strokeWidth='4'
        animationDuration='0.75'
        width='40'
        visible={true}
      />
    </Center>
  );
}

export default LoadingView;
