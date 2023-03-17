import React, { useState } from 'react';
import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Flex,
  Center,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FaPaperPlane } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import * as ttfApi from '../../services/ttf';

function InputPrompt({ setPrompts, setModelResponses }) {
  const [prompt, setPrompt] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);

  const {
    register,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm();

  function mySubmit(e) {
    e.preventDefault();
    handleSubmit(handleSubmitPrompt)(e);
  }

  async function handleSubmitPrompt() {
    if (prompt?.trim() !== '') {
      setPrompts(prevPrompts => [...prevPrompts, prompt]);
      setPrompt('');
      setInputDisabled(true);

      const response = await ttfApi.generate_ttf({ user_prompt: prompt });

      setModelResponses(prevModelResponses => [
        ...prevModelResponses,
        {
          _id: response.data._id,
          images: response.data.images,
          sentences: response.data.sentences,
        },
      ]);

      setInputDisabled(false);
    }
  }

  return (
    <Center>
      <Flex
        mt={4}
        align='center'
        justify='center'
        width={{ base: '100%', lg: '70%' }}>
        <form onSubmit={mySubmit} autoComplete='off' style={{ width: '100%' }}>
          <InputGroup size='lg'>
            <Input
              id='prompt'
              type='text'
              {...register('prompt')}
              placeholder='Input your prompt here'
              value={prompt}
              variant='filled'
              boxShadow='xl'
              onChange={e => setPrompt(e.target.value)}
              isDisabled={inputDisabled}
            />
            <InputRightElement>
              <IconButton
                type='submit'
                isLoading={isSubmitting}
                variant='ghost'
                colorScheme='twitter'
                aria-label='Send Message'
                icon={<FaPaperPlane size='24px' />}
              />
            </InputRightElement>
          </InputGroup>
        </form>
        <IconButton
          boxShadow='xl'
          size='lg'
          colorScheme='yellow'
          aria-label='Upload file'
          icon={<FiUpload />}
          isRound='true'
          ml={3}
        />
      </Flex>
    </Center>
  );
}

export default InputPrompt;
