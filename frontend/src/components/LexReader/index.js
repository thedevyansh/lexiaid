import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Box,
  useDisclosure,
  Flex,
  Tooltip,
  Text,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { BiMicrophone, BiMicrophoneOff } from 'react-icons/bi';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { Bars } from 'react-loader-spinner';

function LexReader() {
  const [fileName, setFileName] = useState('Untitled');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const handleResetTranscript = () => {
    resetTranscript();
  };

  const handleCloseLexReader = () => {
    if (listening) SpeechRecognition.stopListening();
    resetTranscript();
    setFileName('Untitled');
    onClose();
  };

  const handleSave = () => {
    resetTranscript();
    setFileName('Untitled');
    onClose();
  };

  return (
    <>
      <Tooltip
        label={
          !browserSupportsSpeechRecognition
            ? 'Please use a supported browser to use this feature.'
            : ''
        }>
        <Button
          leftIcon={<AddIcon />}
          onClick={onOpen}
          variant='outline'
          borderWidth='0.5px'
          w='100%'
          _hover={{ bg: 'gray.700' }}
          isDisabled={!browserSupportsSpeechRecognition ? true : false}>
          New note
        </Button>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        motionPreset='slideInBottom'
        isLazy={true}
        scrollBehavior='inside'
        size={{ sm: 'full', md: 'xl' }}>
        <ModalOverlay />
        <ModalContent minHeight={{ md: '300px' }}>
          <ModalHeader>
            <Flex justifyContent='space-between' align='center' mb={4}>
              <Text>LexReader</Text>
              <IconButton
                icon={<CloseIcon />}
                onClick={handleCloseLexReader}
                size='sm'
              />
            </Flex>
          </ModalHeader>
          <ModalBody>
            <Box>
              <Flex justifyContent='space-between' align='center' mb={4}>
                <Button
                  leftIcon={listening ? <BiMicrophoneOff /> : <BiMicrophone />}
                  onClick={handleListening}>
                  {listening ? 'Stop recording' : 'Start recording'}
                </Button>
                <Button
                  colorScheme='twitter'
                  variant='link'
                  onClick={handleResetTranscript}>
                  Reset
                </Button>
              </Flex>

              {listening && (
                <Bars
                  height='35'
                  width='35'
                  color='#1da1f1'
                  wrapperStyle={{}}
                  wrapperClass=''
                  visible={true}
                />
              )}
              <Box mt={4}>{transcript}</Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            {!listening && transcript && (
              <Box display='flex'>
                <Input
                  size='sm'
                  placeholder='Untitled'
                  value={fileName}
                  onChange={e => setFileName(e.target.value)}
                />
                <Button
                  colorScheme='twitter'
                  size='sm'
                  ml={2}
                  onClick={handleSave}>
                  Save
                </Button>
              </Box>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LexReader;
