import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  Flex,
  Spacer,
  VStack,
  Avatar,
  Text,
  Heading,
} from '@chakra-ui/react';
import { AiOutlineHome } from 'react-icons/ai';

const URI =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://lexiaid.netlify.com';

const SidebarContent = ({ user }) => (
  <>
    <Button
      leftIcon={<AiOutlineHome />}
      variant='ghost'
      _hover={{ bg: 'gray.700' }}
      onClick={() => {
        window.open(URI, '_self');
      }}>
      Home
    </Button>

    <Flex direction='column' align='center' justify='center'>
      <VStack spacing={4} align='center'>
        <Avatar
          size={{ base: 'md', md: 'xl' }}
          bg='gray.700'
          mt={4}
          src={user.profilePicture}
        />
        <Text fontSize='lg'>{user.googleName ?? user.username}</Text>
      </VStack>
    </Flex>
  </>
);

const Sidebar = ({ isOpen, variant, onClose, user }) => {
  return variant === 'sidebar' ? (
    <Box
      color='gray.200'
      position='fixed'
      left={0}
      p={5}
      w='320px'
      top={0}
      h='100%'
      bg='#1A202C'>
      <SidebarContent user={user} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>LexiAid</DrawerHeader>
          <DrawerBody>
            <SidebarContent user={user} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Sidebar;
