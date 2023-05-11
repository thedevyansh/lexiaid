import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VStack, useToast, Divider, Text, Box } from '@chakra-ui/react';
import UserPrompt from '../UserPrompt';
import ModelResponse from '../ModelResponse';
import { get, changeStatusToFetched } from '../../slices/ttfSlice';
import { InfoOutlineIcon } from '@chakra-ui/icons';

function ChatArea({ pfp }) {
  const promptsEnd = useRef({});
  const ttf = useSelector(state => state.ttf);
  const { status, prompts, modelResponses } = ttf;
  const dispatch = useDispatch();
  const toast = useToast();

  const showToast = useCallback(
    (title, description, toastStatus) => {
      const id = 'toast-id';
      if (!toast.isActive(id)) {
        return toast({
          id,
          title,
          description,
          variant: 'subtle',
          status: toastStatus,
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [toast]
  );

  useEffect(() => {
    if (status === 'success') {
      dispatch(changeStatusToFetched());
      if (prompts.length !== 0) {
        showToast(
          'Prompts fetched.',
          "We've have fetched your previous prompts.",
          'success'
        );
      }
    } else if (status === 'failure') {
      showToast(
        'Error fetching prompts.',
        'Unable to fetch previous prompts at the moment.',
        'success'
      );
    }
  }, [status, showToast, dispatch, prompts.length]);

  const scrollToBottom = () => {
    promptsEnd.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [prompts, modelResponses]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(get());
    }
  }, [dispatch, status]);

  return (
    <VStack
      className='prompt-scrollbar'
      align='stretch'
      flex={1}
      overflow='auto'
      mx={{ lg: 20 }}
      my={2}
      spacing={6}>
      {!prompts.length && (
        <Box
          display='flex'
          alignItems='center'
          gap={2}
          mt={4}>
          <InfoOutlineIcon />
          <Text fontWeight='medium'>Input a prompt or upload a PDF to get started.</Text>
        </Box>
      )}
      {prompts.map((prompt, index) => (
        <React.Fragment key={index}>
          <UserPrompt prompt={prompt} pfp={pfp} userPromptId={index} />
          {!modelResponses[index] ? (
            <ModelResponse modelResponse={null} />
          ) : (
            <>
              <ModelResponse modelResponse={modelResponses[index]} />
              <Divider />
            </>
          )}
        </React.Fragment>
      ))}
      <div style={{ float: 'left', clear: 'both' }} ref={promptsEnd}></div>
    </VStack>
  );
}

export default ChatArea;
