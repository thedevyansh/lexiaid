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
  Box,
} from '@chakra-ui/react';
import { MdTextFields } from 'react-icons/md';

function ThemeBox({ bgColor, handleModalBgColor }) {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      color={bgColor === '#111010' ? '#FFFFFF': ''}
      h='45px'
      w='80px'
      bg={bgColor}
      borderRadius='4px'
      borderColor='gray.300'
      borderWidth='1px'
      cursor='pointer'
      onClick={() => handleModalBgColor(bgColor)}>
      Aa
    </Box>
  );
}

function TextOptions({
  handleFontSizeChange,
  handleSwitchChange,
  handleFontChange,
  modalBgColor,
  handleModalBgColor,
}) {
  const fontFamilies = ['Inter', 'OpenDyslexic', 'Calibri', 'Comic Sans'];
  const bgColors = ['#FFFFFF', '#111010', '#F9F5E6', '#91FFA7', '#89FBFF'];

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        icon={<MdTextFields size='30px' />}
        variant='ghost'
        color={modalBgColor === '#111010' ? '#FFFFFF' : ''}
      />
      <MenuList p={4} zIndex='999' minWidth={{ base: '240px', md: '350px' }}>
        <MenuGroup title='Text Size'>
          <Slider
            aria-label='Text size'
            colorScheme='twitter'
            defaultValue={42}
            min={18}
            max={80}
            onChange={handleFontSizeChange}>
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
          <Switch
            size='md'
            colorScheme='twitter'
            onChange={handleSwitchChange}
          />
        </Flex>
        <MenuDivider my={6} />
        <MenuOptionGroup
          defaultValue='inter'
          title='Font'
          type='radio'
          onChange={(font) => handleFontChange(font)}>
          {fontFamilies.map((font, idx) => (
            <MenuItemOption key={idx} value={font}>
              {font}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>

        <MenuDivider my={6} />
        <MenuGroup title='Themes'>
          <Flex
            gap={4}
            wrap='wrap'
            justify='center'
            align='center'
            width={{ base: '240px', md: '350px' }}>
            {bgColors.map((bgColor, idx) => (
              <ThemeBox
                key={idx}
                bgColor={bgColor}
                handleModalBgColor={handleModalBgColor}
              />
            ))}
          </Flex>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}

export default TextOptions;
