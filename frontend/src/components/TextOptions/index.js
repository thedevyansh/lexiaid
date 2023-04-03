import React from 'react';
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Switch,
  Text,
} from '@chakra-ui/react';
import { MdTextFields } from 'react-icons/md';

function TextOptions() {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        colorScheme='twitter'
        icon={<MdTextFields size='30px' />}
        variant='ghost'
      />
      <MenuList p={4} zIndex='999' minWidth={{ base: '240px', md: '350px' }}>
        <MenuGroup title='Text Size'>
          <Slider
            aria-label='Text size'
            colorScheme='twitter'
            defaultValue={42}
            min={18}
            max={80}>
            <SliderMark value={18} mt='2' ml='-2.5' fontSize='xs'>
              <MdTextFields size='15px' />
            </SliderMark>
            <SliderMark value={42} mt='2' ml='-2.5' fontSize='xs'>
              42px
            </SliderMark>
            <SliderMark value={80} mt='2' ml='-2.5' fontSize='xs'>
              <MdTextFields size='20px' />
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </MenuGroup>
        <MenuDivider my={6} />
        <Flex align='center' justify='space-between'>
          <Text>Increase Spacing</Text>
          <Switch size='md' colorScheme='twitter' />
        </Flex>
        <MenuDivider my={6} />
        <MenuOptionGroup defaultValue='open_dyslexic' title='Font' type='radio'>
          <MenuItemOption value='open_dyslexic'>Open Dyslexic</MenuItemOption>
          <MenuItemOption value='calibri'>Calibri</MenuItemOption>
          <MenuItemOption value='comic_sans'>Comic Sans</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export default TextOptions;
