import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Flex,
  IconButton,
  VStack,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
  useDisclosure,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Switch,
  Text
} from '@chakra-ui/react';
import AccessibilityBtn from '../AssessibilityBtn';
import { GiSpeaker } from 'react-icons/gi';
import { MdTextFields } from 'react-icons/md';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { GoSettings } from 'react-icons/go';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';

function ImmersiveReader({ prompt }) {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenImmersiveReader = async () => {
    setIsLoading(true);

    // Perform some async action here
    await new Promise(r => setTimeout(r, 500));

    setIsLoading(false);
    onOpen();
  };

  return (
    <>
      <IconButton
        isLoading={isLoading}
        icon={<GiSpeaker size='30px' />}
        colorScheme='twitter'
        variant='ghost'
        onClick={handleOpenImmersiveReader}
      />

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset='slideInBottom'
        size='full'
        closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VStack h='100vh' spacing={10} align="stretch">
              <Flex w='100%' justifyContent='space-between'>
                <HStack spacing={6}>
                  <IconButton
                    icon={<AiOutlineArrowLeft size='30px' />}
                    colorScheme='twitter'
                    variant='ghost'
                    onClick={onClose}
                  />
                  <Heading as='h1' fontSize={{ base: 'xl', md: '3xl' }}>
                    Immersive Reader
                  </Heading>
                </HStack>

                <Menu closeOnSelect={false}>
                  <MenuButton
                    as={IconButton}
                    colorScheme='twitter'
                    icon={<MdTextFields size='30px' />}
                    variant='ghost'
                  />
                  <MenuList p={4} zIndex='999' minWidth={{base: '240px', md: '350px'}}>
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
                    <Flex align="center" justify="space-between">
                      <Text>Increase Spacing</Text>
                      <Switch size="md" colorScheme="twitter" />
                    </Flex>
                    <MenuDivider my={6} />
                    <MenuOptionGroup
                      defaultValue='open_dyslexic'
                      title='Font'
                      type='radio'>
                      <MenuItemOption value='open_dyslexic'>Open Dyslexic</MenuItemOption>
                      <MenuItemOption value='calibri'>Calibri</MenuItemOption>
                      <MenuItemOption value='comic_sans'>Comic Sans</MenuItemOption>
                    </MenuOptionGroup>
                  </MenuList>
                </Menu>
              </Flex>

              <Box
                flex='1'
                overflow='auto'
                fontSize='40px'
                px={10}
                lineHeight='200%'>
                {prompt}
              </Box>

              <Flex justifyContent='center'>
                <IconButton
                  borderRadius='50%'
                  size='lg'
                  icon={<BsFillPlayFill size='30px' />}
                  colorScheme='twitter'
                  variant='outline'
                />
                <Menu closeOnSelect={false}>
                  <MenuButton
                    ml={4}
                    size='lg'
                    as={IconButton}
                    icon={<GoSettings size='30px' />}
                    variant='ghost'
                  />
                  <MenuList p={4} zIndex='999' minWidth={{base: '240px', md: '300px'}}>
                    <MenuGroup title='Voice Speed'>
                      <Slider
                        aria-label='Voice speed'
                        colorScheme='twitter'
                        defaultValue={1}
                        min={0.25}
                        max={2}
                        step={0.25}>
                        <SliderMark value={0.25} mt='2' fontSize='xs'>
                          0.25
                        </SliderMark>
                        <SliderMark value={1} mt='2' fontSize='xs'>
                          1
                        </SliderMark>
                        <SliderMark value={2} mt='2' fontSize='xs'>
                          2
                        </SliderMark>
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </MenuGroup>
                    <MenuDivider my={6} />
                    <MenuOptionGroup
                      defaultValue='female'
                      title='Voice Selection'
                      type='radio'>
                      <MenuItemOption value='female'>Female</MenuItemOption>
                      <MenuItemOption value='male'>Male</MenuItemOption>
                    </MenuOptionGroup>
                  </MenuList>
                </Menu>
              </Flex>
            </VStack>
            <AccessibilityBtn onBottom={true} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImmersiveReader;
