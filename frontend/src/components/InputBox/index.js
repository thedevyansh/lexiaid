import React from 'react';
import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';

function InputBox() {
  return (
    <InputGroup size='lg' mt={4} borderColor='gray.400'>
      <Input placeholder='Input the prompt here.' />
      <InputRightElement>
        <IconButton
          colorScheme='twitter'
          aria-label='Send Message'
          icon={<FaPaperPlane />}
        />
      </InputRightElement>
    </InputGroup>
  );
}

export default InputBox;
