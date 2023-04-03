import React, { useState, useEffect } from 'react';
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
  useDisclosure,
} from '@chakra-ui/react';
import AccessibilityBtn from '../AssessibilityBtn';
import TextOptions from '../TextOptions';
import VoiceOptions from '../VoiceOptions';
import { GiSpeaker } from 'react-icons/gi';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import * as textToSpeechApi from '../../services/texttospeech';

function ImmersiveReader({ prompt }) {
  const [audio, setAudio] = useState(new Audio());
  const [playing, setPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (audio.src.length) {
      if (playing) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [audio, playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  const toggle = () => setPlaying(!playing);

  const handleImmersiveReaderClose = () => {
    if (playing) {
      audio.pause();
      audio.currentTime = 0;
    }
    onClose();
  };

  const handleOpenImmersiveReader = async () => {
    setIsLoading(true);

    const response = await textToSpeechApi.synthesize_speech({
      text: prompt,
    });

    var binaryData = [];
    binaryData.push(response.data);
    const audioUrl = window.URL.createObjectURL(new Blob(binaryData));
    setAudio(new Audio(audioUrl));

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
            <VStack h='100vh' spacing={10} align='stretch'>
              <Flex w='100%' justifyContent='space-between'>
                <HStack spacing={6}>
                  <IconButton
                    icon={<AiOutlineArrowLeft size='30px' />}
                    colorScheme='twitter'
                    variant='ghost'
                    onClick={handleImmersiveReaderClose}
                  />
                  <Heading as='h1' fontSize={{ base: 'xl', md: '3xl' }}>
                    Immersive Reader
                  </Heading>
                </HStack>

                <TextOptions />
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
                  icon={
                    playing ? (
                      <BsFillPauseFill size='30px' />
                    ) : (
                      <BsFillPlayFill size='30px' />
                    )
                  }
                  colorScheme='twitter'
                  variant='outline'
                  onClick={toggle}
                />
                <VoiceOptions />
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
