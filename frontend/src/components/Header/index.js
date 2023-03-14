import React from 'react';
import LeftMenu from './sections/LeftMenu';
import RightMenu from './sections/RightMenu';
import { Flex } from '@chakra-ui/react';

function Header() {
  return (
    <Flex
      justifyContent='space-between'
      position='sticky'
      zIndex='1'
      as='nav'
      alignItems='center'
      padding='1rem'>
      <LeftMenu />
      <RightMenu />
    </Flex>
  );
}

export default Header;
