import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Heading, Text, Flex, Button } from '@chakra-ui/react';

function index() {
  return (
    <Flex alignItems='center' flexDirection='column' m='12%'>
      <Helmet>
        <title>404 - LexiAid</title>
      </Helmet>
      <Heading>404</Heading>
      <Text textAlign='center'>
        Oops, the page you're trying to reach doesn't exist :(
      </Text>
      <Link to='/'>
        <Button
          mt={4}
          colorScheme='twitter'
          variant='solid'
          size={{ base: 'md', lg: 'lg' }}>
          Go back
        </Button>
      </Link>
    </Flex>
  );
}

export default index;
