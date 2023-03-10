import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@chakra-ui/react';

function RightMenu() {
  const { authenticated, profilePicture } = useSelector(state => state.user);

  if (authenticated) {
    return <Avatar size='sm' bg='gray.800' src={profilePicture} />;
  }
  return null;
}

export default RightMenu;
