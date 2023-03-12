import { Divider } from '@chakra-ui/react';
import PromptAreaHeader from '../PromptAreaHeader';

const PromptArea = ({ showSidebarButton = true, onShowSidebar }) => {
  return (
    <>
      <PromptAreaHeader
        showSidebarButton={showSidebarButton}
        onShowSidebar={onShowSidebar}
      />
      <Divider />
    </>
  );
};

export default PromptArea;
