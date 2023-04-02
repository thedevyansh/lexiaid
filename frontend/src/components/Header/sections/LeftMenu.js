import React from 'react';
import { Image, HStack, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

function LeftMenu() {
  return (
    <Link to='/'>
      <HStack spacing={3}>
        <Image src={logo} alt='LexiAid Logo' w={{ base: '40px', lg: '60px' }} />
        <Heading as="h1" fontSize={{ base: 'xl', md: '2xl' }}>LexiAid</Heading>
      </HStack>
    </Link>
  );
}

export default LeftMenu;
