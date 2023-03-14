import React from 'react';
import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';
import {FiUpload} from 'react-icons/fi'

function InputPrompt() {
  return (
    <Flex mt={4} align='center'>
      <InputGroup size='lg' borderColor='gray.400'>
        <Input placeholder='Input the prompt here.' />
        <InputRightElement>
          <IconButton
            colorScheme='twitter'
            aria-label='Send Message'
            icon={<FaPaperPlane />}
          />
        </InputRightElement>
      </InputGroup>
      <IconButton
      size='lg'
        colorScheme='yellow'
        aria-label='Upload file'
        icon={<FiUpload />}
        isRound='true'
        ml={3}
      />
    </Flex>
  );
}

export default InputPrompt;
