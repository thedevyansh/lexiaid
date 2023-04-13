import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  IconButton,
  VStack,
  HStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import ImmersiveReaderText from '../ImmersiveReaderText';
import AccessibilityBtn from '../AssessibilityBtn';
import TextOptions from '../TextOptions';
import VoiceOptions from '../VoiceOptions';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import * as textToSpeechApi from '../../services/texttospeech';

function ImmersiveReader({ prompt, isOpen, onClose, userPromptId }) {
  const [audio, setAudio] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [timePoints, setTimePoints] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timersRef = useRef([]);
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
    if (audio)
      audio.addEventListener('ended', () => {
        setPlaying(false);
        timersRef.current = [];
      });
    return () => {
      if (audio)
        audio.removeEventListener('ended', () => {
          setPlaying(false);
          timersRef.current = [];
        });
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
      userPromptId,
    });

    const { audio_url, time_points } = response.data;

    // const audioBuffer = response.data.audioContent;
    // const blob = new Blob([audioBuffer], { type: 'audio/mp3' });
    // const audioUrl = window.URL.createObjectURL(blob);

    setAudioUrl(audio_url);
    setTimePoints(time_points);

    if (!audio) {
      setAudio(new Audio(audio_url));
    } else {
      audio.src = audio_url;
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

              <ImmersiveReaderText
                prompt={prompt}
                audio={audio}
                timePoints={timePoints}
                playing={playing}
                timersRef={timersRef}
              />

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
