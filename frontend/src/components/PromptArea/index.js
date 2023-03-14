import React, { useState } from 'react';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import PromptAreaHeader from '../PromptAreaHeader';
import ChatArea from '../ChatArea';
import InputPrompt from '../InputPrompt';

const PromptArea = ({ showSidebarButton = true, onShowSidebar, pfp }) => {
  const [prompts, setPrompts] = useState([]);
  const [modelResponses, setModelResponses] = useState([])

  return (
    <Box h='100vh' display='flex' flexDirection='column' flex='1' p={4}>
      <PromptAreaHeader
        showSidebarButton={showSidebarButton}
        onShowSidebar={onShowSidebar}
      />
      <Flex align='center' mt={2}>
        <Divider />
        <Text pl='4' pr='4' fontSize='sm'>
          LexiAid
        </Text>
        <Divider />
      </Flex>
      <ChatArea pfp={pfp} prompts={prompts} modelResponses={modelResponses} />
      <InputPrompt setPrompts={setPrompts} setModelResponses={setModelResponses} />
    </Box>
  );
};

export default PromptArea;
