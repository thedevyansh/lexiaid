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

const instance = axios.create({
  baseURL:
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://lexiaid.herokuapp.com',
  withCredentials: true,
});

function InputPrompt({ setPrompts, setModelResponses }) {
  const [prompt, setPrompt] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSubmitPrompt();
    }
  };

  async function handleSubmitPrompt() {
    if (prompt !== '') {
      const request = {
        user_prompt: prompt,
      };
      setPrompts(prevPrompts => [...prevPrompts, prompt]);
      setPrompt('');
      setBtnDisabled(true);

      const response = await instance.post(
        'http://localhost:5000/service/new_ttf',
        request
      );

      setModelResponses(prevModelResponses => [
        ...prevModelResponses,
        { images: response.data.images, sentences: response.data.sentences },
      ]);

      setBtnDisabled(false);
    }
  }

  return (
    <Flex mt={4} align='center' justify='center'>
      <InputGroup
        size='lg'
        borderColor='gray.400'
        width={{ base: '100%', lg: '70%' }}>
        <Input
          isDisabled={btnDisabled}
          placeholder='Input the prompt here.'
          value={prompt}
          onKeyDown={handleKeyDown}
          onChange={e => setPrompt(e.target.value)}
        />
        <InputRightElement>
          <IconButton
            isDisabled={btnDisabled}
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
