import React from 'react';
import { VStack } from '@chakra-ui/react';
import UserPrompt from '../UserPrompt';
import ModelResponse from '../ModelResponse';

function ChatArea({ pfp }) {
  return (
    <VStack align='stretch' flex={1} overflow='auto' mx={{'lg': 10}} my={4} spacing={6}>
      <UserPrompt pfp={pfp} />
      <ModelResponse />
    </VStack>
  );
}

export default ChatArea;
