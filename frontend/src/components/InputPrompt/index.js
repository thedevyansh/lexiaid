import React, { useState } from 'react';
import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import axios from 'axios';

function InputPrompt({ setPrompts, setModelResponses }) {
  const [prompt, setPrompt] = useState('');

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSubmitPrompt();
    }
  };

  async function handleSubmitPrompt() {
    if (prompt !== '') {
      setPrompts(prevPrompts => [...prevPrompts, prompt]);
      setPrompt('');

      setModelResponses(prevModelResponses => [...prevModelResponses, ['1', '2', '3']])

      console.log('Message sent to server...');
      
      // call the api to fetch dummy data and call setModelResponse() on that data
    }
  }

  return (
    <Flex mt={4} align='center'>
      <InputGroup size='lg' borderColor='gray.400'>
        <Input
          placeholder='Input the prompt here.'
          value={prompt}
          onKeyDown={handleKeyDown}
          onChange={e => setPrompt(e.target.value)}
        />
        <InputRightElement>
          <IconButton
            colorScheme='twitter'
            aria-label='Send Message'
            icon={<FaPaperPlane />}
            onClick={handleSubmitPrompt}
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
