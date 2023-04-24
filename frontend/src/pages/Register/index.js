import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register as apiRegister } from '../../slices/userSlice';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useToast,
  Divider,
  Flex
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { Link as ReactLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import LoginWithGoogle from '../../components/LoginWithGoogle';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowConfirmPW = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [passwordValue, setPasswordValue] = useState('');

  const validateUsername = value => {
    if (value) {
      if (!/^\w+$/.test(value)) {
        return 'Username can only contain A-Z, a-z, 0-9, _';
      }
      return true;
    }
    return 'Enter your username';
  };

  const validatePassword = value => {
    if (value) {
      if (value.length < 6) {
        return 'Password length must be atleast 6';
      }
      return true;
    }
    return 'Enter your password';
  };

  const validateConfirmPassword = value => {
    if (!value) {
      return 'Confirm your password';
    } else if (value !== passwordValue) {
      return 'Passwords do not match';
    }
    return true;
  };

  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();
  const toast = useToast();
  const onSubmit = data => {
    const body = {
      username: data.username,
      password: data.password,
    };

    return dispatch(apiRegister(body)).then(res => {
      if (res.type === 'user/register/rejected') {
        toast({
          title: 'Registration error',
          description: res?.error?.message ?? 'Please try again',
          status: 'error',
          variant: 'subtle',
          duration: 4000,
        });
      } else if (res.type === 'user/register/fulfilled') {
        window.location.reload();
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Register - LexiAid</title>
      </Helmet>
      <Box maxW='md' mx='auto' py='2rem'>
        <Heading textAlign='center' size='lg'>
          Create your account
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
                    onChange={event => setPasswordValue(event.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                  />
                  <InputRightElement>
                    <IconButton
                      onClick={handleShowPassword}
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
              <FormControl isInvalid={errors.confirmPassword}>
                <FormLabel htmlFor='confirmPassword'>
                  Confirm Password
                </FormLabel>
                <InputGroup>
                  <Input
                    id='confirmPassword'
                    {...register('confirmPassword', {
                      validate: validateConfirmPassword,
                    })}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm your password'
                  />
                  <InputRightElement>
                    <IconButton
                      onClick={handleShowConfirmPW}
                      variant='ghost'
                      size='sm'
                      icon={showConfirmPassword ? <HiEyeOff /> : <HiEye />}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                isLoading={isSubmitting}
                type='submit'
                colorScheme='twitter'
                size='lg'
                fontSize='md'>
                Sign up
              </Button>
            </Stack>
          </form>
          <Text mt='3' align='center' maxW='md'>
            <Text as='span'>Already have an account? </Text>
            <Link color='#1DA1F1' as={ReactLink} to='/login'>
              Log in
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

export default Register;
