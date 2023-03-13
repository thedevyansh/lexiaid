import { Box, Divider, Flex } from '@chakra-ui/react';
import PromptAreaHeader from '../PromptAreaHeader';
import InputBox from '../InputBox';

const PromptArea = ({ showSidebarButton = true, onShowSidebar }) => {
  return (
    <Box ml={!showSidebarButton && 320}>
      <PromptAreaHeader
        showSidebarButton={showSidebarButton}
        onShowSidebar={onShowSidebar}
      />
      <Divider />
    </Box>
  );
};

export default PromptArea;
