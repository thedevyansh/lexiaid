import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuDivider,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { BsUniversalAccess } from 'react-icons/bs';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import ChangeFontSize from '../ChangeFontSize';

function AccessibilityBtn({ onBottom }) {
  const { colorMode, toggleColorMode } = useColorMode();

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
      <MenuList
        p={2}
        color={colorMode === 'dark' ? '' : 'gray.900'}
        zIndex='999'>
        <ChangeFontSize />
        <MenuDivider />
        <Button
          leftIcon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
          onClick={toggleColorMode}
          variant='ghost'>
          {colorMode === 'dark' ? 'Light mode' : 'Dark mode'}
        </Button>
      </MenuList>
    </Menu>
  );
}

export default AccessibilityBtn;
