import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Flex, useBreakpointValue } from '@chakra-ui/react';

import Sidebar from '../../components/Sidebar';
import PromptArea from '../../components/PromptArea';

const smVariant = { navigation: 'drawer', navigationButton: true };
const mdVariant = { navigation: 'sidebar', navigationButton: false };

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  const user = useSelector(state => state.user);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <Flex h='100vh'>
      <Sidebar
        variant={variants?.navigation}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        user={user}
      />
      <PromptArea
        showSidebarButton={variants?.navigationButton}
        onShowSidebar={toggleSidebar}
        pfp={user.profilePicture}
      />
    </Flex>
  );
}
