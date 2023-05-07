import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
  Avatar,
  Text,
  Divider,
  Center,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { BiHomeAlt2 } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';

import { logout } from '../../slices/userSlice';
import AccessibilityBtn from '../AssessibilityBtn';
import LexReader from '../LexReader';

const URI =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://lexiaid.netlify.com';

const SidebarContent = ({ handleLogout, user }) => (
  <>
    <Box display='flex' justifyContent='space-between'>
      <Button
        leftIcon={<BiHomeAlt2 />}
        variant='ghost'
        _hover={{ bg: 'gray.700' }}
        w='max-content'
        onClick={() => {
          window.open(URI, '_self');
        }}>
        Home
      </Button>
      <AccessibilityBtn />
    </Box>

    <VStack spacing={4}>
      <Avatar
        size={{ base: 'lg', md: 'xl' }}
        bg='gray.700'
        src={user.profilePicture}
        mt={4}
      />
      <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight='bold'>
        {user.googleName ?? user.username}
      </Text>
    </VStack>

    <Box flex='1' overflow='auto' mt={4}>
      <LexReader />
    </Box>

    <Divider />

    <Center>
      <Button
        colorScheme='red'
        w='max-content'
        leftIcon={<FiLogOut />}
        variant='outline'
        _hover={{ bg: 'gray.700' }}
        onClick={handleLogout}>
        Log out
      </Button>
    </Center>
  </>
);

const Sidebar = ({ isOpen, variant, onClose, user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return variant === 'sidebar' ? (
    <Box
      display='flex'
      flexDirection='column'
      rowGap={4}
      color='gray.200'
      p={5}
      w='280px'
      h='100vh'
      bg='#1A202C'>
      <SidebarContent user={user} handleLogout={handleLogout} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg='#1A202C' color='gray.200'>
          <DrawerCloseButton />
          <DrawerHeader>LexiAid</DrawerHeader>
          <DrawerBody>
            <Box display='flex' flexDirection='column' height='100%' rowGap={4}>
              <SidebarContent user={user} handleLogout={handleLogout} />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Sidebar;
