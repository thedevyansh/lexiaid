import {
    Box,
    Center,
    IconButton,
    Flex,
    Image,
  } from '@chakra-ui/react';
  import { ChevronRightIcon } from '@chakra-ui/icons';
  import logo from './logo.png';

const PromptAreaHeader = ({ showSidebarButton = true, onShowSidebar }) => {
    return (
        <Flex p={4} justifyContent='center'>
          <Box flex='1'>
            {showSidebarButton && (
              <IconButton
                icon={<ChevronRightIcon w={8} h={8} />}
                colorScheme='blackAlpha'
                variant='outline'
                onClick={onShowSidebar}
              />
            )}
          </Box>
          <Center flex='1'>
            <Image
              src={logo}
              alt='LexiAid Logo'
              w='40px'
            />
          </Center>
          <Box flex='1' />
        </Flex>
    );
  };
  
  export default PromptAreaHeader;