import React, { useState, useEffect, useRef } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import AccessibilityBtn from '../AssessibilityBtn';
import TextOptions from '../TextOptions';
import VoiceOptions from '../VoiceOptions';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import * as textToSpeechApi from '../../services/texttospeech';

function ImmersiveReader({ prompt, isOpen, onClose }) {
  const [audio, setAudio] = useState(new Audio());
  const [audioUrl, setAudioUrl] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const toastIdRef = useRef();

  useEffect(() => {
    if (audioUrl) {
      if (playing) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [audio, playing, audioUrl]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  const toggle = () => setPlaying(!playing);

  const showToast = () => {
    toastIdRef.current = toast({
      description: 'Please wait...',
      status: 'info',
      variant: 'subtle',
      position: 'top',
      duration: null,
      isClosable: true,
    });
  };

  const closeToast = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  };

  const synthesizeSpeech = async () => {
    setIsLoading(true);
    showToast();

    const response = await textToSpeechApi.synthesize_speech({
      text: prompt,
    });

    const audioBuffer = response.data;
    const blob = new Blob([audioBuffer], { type: 'audio/mp3' });
    const audioUrl = window.URL.createObjectURL(blob);

    setAudioUrl(audioUrl);
    setAudio(new Audio(audioUrl));

    closeToast();
    setIsLoading(false);
  };

  const handleImmersiveReaderClose = () => {
    if (audioUrl) {
      if (playing) {
        audio.pause();
        audio.currentTime = 0;
      }
      window.URL.revokeObjectURL(audioUrl);
    }
    onClose();
  };

  const handlePlaySpeech = async () => {
    if (!audioUrl) {
      synthesizeSpeech();
    }
    toggle();
  };

  return (
    <>
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
                fontSize={{ base: '30px', md: '40px' }}
                px={10}
                lineHeight='180%'>
                {prompt}
              </Box>

              <Flex justifyContent='center'>
                <IconButton
                  isLoading={isLoading}
                  borderRadius='50%'
                  size='lg'
                  icon={
                    playing ? (
                      <BsFillPauseFill size='30px' />
                    ) : (
                      <BsFillPlayFill size='30px' />
                    )
                  }
                  colorScheme='yellow'
                  onClick={handlePlaySpeech}
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
