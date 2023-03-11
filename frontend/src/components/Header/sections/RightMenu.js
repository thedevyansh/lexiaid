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
      <HStack spacing={4}>
        <Avatar size='sm' bg='gray.800' src={profilePicture} />
        <Button
          colorScheme='red'
          variant='outline'
          size='sm'
          onClick={handleLogout}>
          Log out
        </Button>
      </HStack>
    );
  }
  return null;
}

export default RightMenu;
