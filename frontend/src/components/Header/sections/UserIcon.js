import React from 'react';
import { Avatar } from '@chakra-ui/react';

const UserIcon = ({ isAuth, image }) => {
  if (isAuth) {
    return <Avatar size='sm' bg='gray.800' src={image} />;
  }
  return null;
};

export default UserIcon;
