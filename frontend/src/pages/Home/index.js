import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heading,
  Text,
  ButtonGroup,
  Button,
  Image,
  Flex,
  Center,
  Box,
  Highlight,
} from '@chakra-ui/react';
import { FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import logo from './logo.png';

export default function Home({ history, user }) {
  // we can use "user" to access his/her username, profilepage, authenticated-status etc.
  // usage: user?.authenticated, user?.username, ...

  return (
    <>
      <Helmet>
        <title>LexiAid</title>
      </Helmet>
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        p={{
          base: '20px',
          sm: '40px',
          md: '50px',
        }}>
        <Box>
          <Flex align='center'>
            <Image
              src={logo}
              alt='LexiAid Logo'
              mr={4}
              w={{
                base: '80px',
                sm: '100px',
                md: '120px',
                lg: '300px',
              }}
            />
            <Heading
              as='h1'
              fontSize={{
                base: '30px',
                sm: '40px',
                md: '60px',
                lg: '100px',
                xl: '120px',
              }}
              ml={4}>
              Introducing LexiAid.
            </Heading>
          </Flex>
          <Text
            fontSize={{
              base: 'md',
              md: 'lg',
              lg: 'xl',
            }}
            mt='30px'>
            <Highlight
              query={['accessible', 'intuitive']}
              styles={{
                px: '1',
                py: '1',
                bg: '#FFDE59',
              }}>
              An innovative model designed to help individuals with dyslexia
              overcome reading challenges. LexiAid converts written content into
              a set of visual images that describe the material, providing a
              more accessible and intuitive way to understand and learn.
            </Highlight>
          </Text>
          <Center>
            <ButtonGroup
              variant='outline'
              spacing='3'
              mt='30px'
              alignContent='center'>
              <Link to='/login'>
                <Button
                  leftIcon={<FaSignInAlt />}
                  colorScheme='twitter'
                  variant='solid'
                  size={{ base: 'md', lg: 'lg' }}>
                  Log in
                </Button>
              </Link>
              <Link to='/register'>
                <Button
                  leftIcon={<FaUserAlt />}
                  colorScheme='twitter'
                  variant='solid'
                  size={{ base: 'md', lg: 'lg' }}>
                  Sign up
                </Button>
              </Link>
            </ButtonGroup>
          </Center>
        </Box>
      </Flex>
    </>
  );
}
