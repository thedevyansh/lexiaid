import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, HStack } from '@chakra-ui/react';
import { logout } from '../../../slices/userSlice';

function RightMenu() {
  const { authenticated, profilePicture } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (authenticated) {
    return (
      <HStack spacing={6}>
        <Avatar
          size={{ base: 'sm', md: 'md' }}
          bg='gray.800'
          src={profilePicture}
        />
        <Button colorScheme='red' variant='outline' onClick={handleLogout}>
          Log out
        </Button>
      </HStack>
    );
  }
  return null;
}

export default RightMenu;
