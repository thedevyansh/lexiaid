import React from 'react';
import { useSelector } from 'react-redux';
import { Flex } from '@chakra-ui/react';
import UserIcon from './UserIcon';

function RightMenu() {
  const { authenticated, profilePicture } = useSelector(
    state => state.user
  );

  return (
    <Flex alignItems='center'>
      <UserIcon isAuth={authenticated} image={profilePicture} />
    </Flex>
  );
}

export default RightMenu;
