import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/userSlice';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Heading,
  Link,
  Stack,
  Text,
  useToast,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { Link as ReactLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import LoginWithGoogle from '../../components/LoginWithGoogle';

const validateUsername = value => {
  return value ? true : 'Enter your username';
};

const validatePassword = value => {
  return value ? true : 'Enter your password';
};

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();
  const toast = useToast();
  const onSubmit = data =>
    dispatch(login(data)).then(res => {
      if (res.type === 'user/login/rejected') {
        toast({
          title: 'Login error',
          description: res?.error?.message ?? 'Please try again.',
          status: 'error',
          variant: 'subtle',
          duration: 4000,
        });
      } else if (res.type === 'user/login/fulfilled') {
        window.location.reload();
      }
    });

  return (
    <>
      <Helmet>
        <title>Login - LexiAid</title>
      </Helmet>
      <Box maxW='md' mx='auto' py='2rem'>
        <Heading textAlign='center' size='lg'>
          Welcome back
        </Heading>
        <Box py='6' px={{ base: '4', md: '10' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing='6'>
              <FormControl isInvalid={errors.username}>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input
                  id='username'
                  {...register('username', { validate: validateUsername })}
                  placeholder='Enter your username'
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup>
                  <Input
                    id='password'
                    {...register('password', { validate: validatePassword })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                  />
                  <InputRightElement>
                    <IconButton
                      onClick={handleClick}
                      variant='ghost'
                      size='sm'
                      icon={showPassword ? <HiEyeOff /> : <HiEye />}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                isLoading={isSubmitting}
                type='submit'
                colorScheme='twitter'
                size='lg'
                fontSize='md'>
                Log in
              </Button>
            </Stack>
          </form>
          <Text mt='3' align='center' maxW='md'>
            <Text as='span'>Don&apos;t have an account? </Text>
            <Link color='#1DA1F1' as={ReactLink} to='/register'>
              Sign up
            </Link>
          </Text>
          <Flex align='center'>
            <Divider />
            <Text padding='4' fontSize='xs'>
              OR
            </Text>
            <Divider />
          </Flex>
          <LoginWithGoogle />
        </Box>
      </Box>
    </>
  );
}

export default Login;
