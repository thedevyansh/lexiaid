import React from 'react';
import { VStack } from '@chakra-ui/react';
import UserPrompt from '../UserPrompt';
import ModelResponse from '../ModelResponse';

function ChatArea({ prompts, modelResponses, pfp }) {
  return (
    <VStack
      align='stretch'
      flex={1}
      overflow='auto'
      mx={{ lg: 10 }}
      my={4}
      spacing={6}>
      {prompts.map((prompt, index) => (
        <>
          <UserPrompt key={index} prompt={prompt} pfp={pfp} />
          {/* Need to take care of key here */}
          {modelResponses[index] && (
            <ModelResponse key={index + 2} modelResponse={modelResponses[index]} />
          )}
        </>
      ))}
      {/* <ModelResponse /> */}
    </VStack>
  );
}

export default ChatArea;
