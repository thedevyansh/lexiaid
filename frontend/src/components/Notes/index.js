import React, { useState } from 'react';
import {
  Button,
  Box,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';
import { TbNote } from 'react-icons/tb';

function Notes({ notes }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [noteName, setNoteName] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const handleNoteBtnClick = note => {
    setNoteName(note.note_name);
    setNoteContent(note.note_content);
    onOpen();
  };

  return (
    <Box mt={4}>
      <Text ml={4} mb={2} color='gray.500' fontWeight='bold' fontSize='sm'>
        Your notes
      </Text>
      {notes.map((note, index) => (
        <Button
          key={index}
          leftIcon={<TbNote />}
          justifyContent='flex-start'
          variant='ghost'
          w='100%'
          _hover={{ bg: 'gray.700' }}
          fontWeight='normal'
          onClick={() => handleNoteBtnClick(note)}>
          <Text noOfLines={1}>{note.note_name}</Text>
        </Button>
      ))}

      <Modal onClose={onClose} size={{ sm: 'full', md: 'xl' }} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{noteName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{noteContent}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose} size='sm'>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Notes;
