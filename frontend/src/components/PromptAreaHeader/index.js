import { Box, Center, IconButton, Flex, Image } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import logo from './logo.png';

const PromptAreaHeader = ({ showSidebarButton = true, onShowSidebar }) => {
  return (
    <Flex justifyContent='center'>
      <Box flex='1'>
        {showSidebarButton && (
          <IconButton
            icon={<HamburgerIcon w={6} h={6} />}
            variant='ghost'
            onClick={onShowSidebar}
          />
        )}
      </Box>
      <Center flex='1'>
        <Image src={logo} alt='LexiAid Logo' w='40px' />
      </Center>
      <Box flex='1' />
    </Flex>
  );
};

export default PromptAreaHeader;
