import React from 'react';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import PromptAreaHeader from '../PromptAreaHeader';
import ChatArea from '../ChatArea';
import InputPrompt from '../InputPrompt';

const PromptArea = ({ showSidebarButton = true, onShowSidebar, pfp }) => {
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
      <ChatArea pfp={pfp} />
      <InputPrompt />
      <Text fontSize={{ base: 'xs', lg: 'sm' }} textAlign='center' mt={2}>
        Our goal is to provide a more accessible and intuitive way to understand
        and learn.
      </Text>
    </Box>
  );
};

export default PromptArea;
