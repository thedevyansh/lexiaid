import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import PromptAreaHeader from '../PromptAreaHeader';
import ChatArea from '../ChatArea';
import InputPrompt from '../InputPrompt';

const PromptArea = ({ showSidebarButton = true, onShowSidebar }) => {
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
      <ChatArea />
      <InputPrompt />
    </Box>
  );
};

export default PromptArea;
