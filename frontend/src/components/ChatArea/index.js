import React, { useEffect, useRef } from 'react';
import { VStack } from '@chakra-ui/react';
import UserPrompt from '../UserPrompt';
import ModelResponse from '../ModelResponse';

function ChatArea({ prompts, modelResponses, pfp }) {
  const promptsEnd = useRef({});

  const scrollToBottom = () => {
    promptsEnd.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [prompts, modelResponses]);

  return (
    <VStack
      className='prompt-scrollbar'
      align='stretch'
      flex={1}
      overflow='auto'
      mx={{ lg: 10 }}
      my={2}
      spacing={6}>
      {prompts.map((prompt, index) => (
        <>
          <UserPrompt key={index} prompt={prompt} pfp={pfp} />
          {/* Need to take care of key here */}
          {modelResponses[index] && (
            <ModelResponse
              key={modelResponses[index]['_id']}
              modelResponse={modelResponses[index]}
            />
          )}
        </>
      ))}
      <div style={{ float: 'left', clear: 'both' }} ref={promptsEnd}></div>
    </VStack>
  );
}

export default ChatArea;
