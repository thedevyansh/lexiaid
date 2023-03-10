import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from './lexiaidLogoWithName.png';

function LeftMenu() {
  return (
    <Flex align='center'>
      <Link to='/'>
        <Image src={logo} alt='LexiAid Logo' w='180px' />
      </Link>
    </Flex>
  );
}

export default LeftMenu;
