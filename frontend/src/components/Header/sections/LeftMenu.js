import React from 'react';
import { Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from './lexiaidLogoWithName.png';

function LeftMenu() {
  return (
    <Link to='/'>
      <Image
        src={logo}
        alt='LexiAid Logo'
        w={{ base: '120px', md: '150px', lg: '180px' }}
      />
    </Link>
  );
}

export default LeftMenu;
