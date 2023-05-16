import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  addUserPrompt,
  generateTtf,
  uploadPdfAndGenerateTtf,
  addModelResponseOfPdf,
} from '../../slices/ttfSlice';
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
  const inputRef = useRef(null);
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

  function handleFileUpload() {
    inputRef.current.click();
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
    }
  }

  async function uploadFile(file) {
    dispatch(addUserPrompt(file.name));
    setInputDisabled(true);

    const formData = new FormData();
    formData.append('file', file);

    // NEED TO CHECK WHY DISPATCH ISN'T WORKING WHILE UPLOADING PDF !!!
    // dispatch(uploadPdfAndGenerateTtf({ file: formData }));

    const response = await fetch(
      'http://localhost:5000/service/generate_ttf_from_pdf',
      {
        method: 'POST',
        body: formData,
        credentials: 'include',
      }
    );
    const data = await response.json();
    // handle errors for unsupported media, file not found, etc. here...
    dispatch(addModelResponseOfPdf(data));
    setInputDisabled(false);
  }

  async function handleSubmitPrompt() {
    const trimmedPrompt = prompt?.trim();
    if (trimmedPrompt !== '') {
      dispatch(addUserPrompt(trimmedPrompt));
      setPrompt('');
      setInputDisabled(true);

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
                isDisabled={inputDisabled}
                icon={<FaPaperPlane size='24px' />}
              />
            </InputRightElement>
          </InputGroup>
        </form>
        {/* <form encType='multipart/form-data'> */}
        <IconButton
          boxShadow='xl'
          size='lg'
          colorScheme='yellow'
          aria-label='Upload file'
          icon={<FiUpload />}
          isRound='true'
          onClick={handleFileUpload}
          isDisabled={inputDisabled}
          ml={3}
        />
        <Input
          type='file'
          ref={inputRef}
          display='none'
          onChange={handleFileChange}
        />
        {/* </form> */}
      </Flex>
    </Center>
  );
}

export default InputPrompt;
