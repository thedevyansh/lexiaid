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
  useToast,
} from '@chakra-ui/react';
import AccessibilityBtn from '../AssessibilityBtn';
import TextOptions from '../TextOptions';
import VoiceOptions from '../VoiceOptions';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import * as textToSpeechApi from '../../services/texttospeech';

function ImmersiveReader({ prompt, isOpen, onClose }) {
  const [audio, setAudio] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const showToast = ({ description, status }) => {
    toast({
      description,
      status,
      variant: 'subtle',
      position: 'top',
      duration: 5000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (audioUrl) {
      if (playing) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [audio, audioUrl, playing]);

  useEffect(() => {
    if (audio) audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      if (audio) audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  const togglePlay = () => setPlaying(!playing);

  const synthesizeSpeech = async (speakingRate, voiceGender) => {
    setIsLoading(true);
    showToast({ description: 'Please wait...', status: 'info' });

    const response = await textToSpeechApi.synthesize_speech({
      text: prompt,
      speakingRate,
      voiceGender,
    });

    const audioBuffer = response.data;
    const blob = new Blob([audioBuffer], { type: 'audio/mp3' });
    const audioUrl = window.URL.createObjectURL(blob);

    setAudioUrl(audioUrl);

    if (!audio) {
      setAudio(new Audio(audioUrl));
    } else {
      audio.src = audioUrl;
    }

    setIsLoading(false);
    showToast({ description: 'Speech ready to play', status: 'success' });
  };

  const handleAudioRemoval = isImmersiveReaderExit => {
    if (audioUrl) {
      if (playing) {
        audio.pause();
        togglePlay();
      }
      audio.currentTime = 0;
      window.URL.revokeObjectURL(audioUrl);
    }

    if (isImmersiveReaderExit) onClose();
  };

  const handlePlaySpeech = async () => {
    if (!audioUrl) synthesizeSpeech(1, 'female');
    else togglePlay();
  };

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isLazy={true}
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
                    onClick={() => handleAudioRemoval(true)}
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
                <VoiceOptions
                  synthesizeSpeech={synthesizeSpeech}
                  handleAudioRemoval={handleAudioRemoval}
                />
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
