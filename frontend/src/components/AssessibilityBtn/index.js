import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuDivider,
  Button,
} from '@chakra-ui/react';
import { BsUniversalAccess } from 'react-icons/bs';
import { SunIcon } from '@chakra-ui/icons';
import ChangeFontSize from '../ChangeFontSize';

function AccessibilityBtn({ onBottom }) {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        borderRadius='50%'
        position={onBottom ? 'fixed' : ''}
        bottom={onBottom ? '8' : ''}
        right={onBottom ? '8' : ''}
        zIndex={onBottom ? '999' : ''}
        as={IconButton}
        aria-label='Accessibility Options'
        icon={<BsUniversalAccess />}
        colorScheme='twitter'
        size='lg'
      />
      <MenuList p={2} color='#000000'>
        <ChangeFontSize />
        <MenuDivider />
        <Button leftIcon={<SunIcon />}>High contrast</Button>
      </MenuList>
    </Menu>
  );
}

export default AccessibilityBtn;
