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
  Container,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import graphics from './graphics.png';
import { useSelector } from 'react-redux';

const URI =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/learningarea'
    : 'https://lexiaid.netlify.com/learningarea';

export default function Home({ history, user }) {
  // we can use "user" to access his/her username, profilepage, authenticated-status etc.
  // usage: user?.authenticated, user?.username, ...
  const { authenticated } = useSelector(state => state.user);

  return (
    <>
      <Helmet>
        <title>LexiAid</title>
      </Helmet>
      <Container
        // h='calc(100vh - 72px)'
        d='flex'
        justifyContent='center'
        flexDir='column'
        maxW={{
          base: 'container.sm',
          sm: 'container.sm',
          md: 'container.md',
          lg: 'container.lg',
          xl: 'container.xl',
        }}>
        <Box mt='2rem'>
          <Flex align='center'>
            <Image
              src={graphics}
              alt='Graphics for LexiAid'
              w={{
                base: '80px',
                sm: '100px',
                md: '120px',
                lg: '300px',
              }}
              mr={4}
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
              Introducing <br />
              LexiAid.
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
            {authenticated && (
              <Button
                colorScheme='twitter'
                variant='solid'
                mt='30px'
                size={{ base: 'md', lg: 'lg' }}
                onClick={() => {
                  window.open(URI, '_self');
                }}>
                Start learning
              </Button>
            )}

            {!authenticated && (
              <ButtonGroup
                variant='solid'
                spacing='3'
                mt='30px'
                alignContent='center'>
                <Link to='/login'>
                  <Button colorScheme='twitter' size={{ base: 'md', lg: 'lg' }}>
                    Log in
                  </Button>
                </Link>
                <Link to='/register'>
                  <Button colorScheme='twitter' size={{ base: 'md', lg: 'lg' }}>
                    Sign up
                  </Button>
                </Link>
              </ButtonGroup>
            )}
          </Center>
        </Box>
      </Container>
    </>
  );
}
