import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserPrompt, generateTtf } from '../../slices/ttfSlice';
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

function InputPrompt() {
  const [prompt, setPrompt] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const dispatch = useDispatch();

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
    const trimmedPrompt = prompt?.trim();
    if (trimmedPrompt !== '') {
      dispatch(addUserPrompt(trimmedPrompt));
      setPrompt('');
      setInputDisabled(true);

      // Only to simulate the delay in receiving the response. Remove this later.
      await new Promise(r => setTimeout(r, 2000));
      dispatch(generateTtf({ user_prompt: trimmedPrompt })); // use ttf/generateTtf/fulfilled and rejected here

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
              autoFocus
              id='prompt'
              type='text'
              {...register('prompt')}
              placeholder='Input the prompt here.'
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
