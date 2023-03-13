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
    VStack,
    Avatar,
    Text,
    Divider,
    Spacer,
  } from '@chakra-ui/react';
  import { useDispatch } from 'react-redux';
  import { BiHomeAlt2 } from 'react-icons/bi';
  import { FiLogOut } from 'react-icons/fi';
  
  import { logout } from '../../slices/userSlice';
  
  const URI =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://lexiaid.netlify.com';
  
  const SidebarContent = ({ handleLogout, user }) => (
    <>
      <Box display='flex'>
        <Button
          leftIcon={<BiHomeAlt2 />}
          variant='ghost'
          _hover={{ bg: 'gray.700' }}
          onClick={() => {
            window.open(URI, '_self');
          }}>
          Home
        </Button>
        <Spacer />
        <Button
          color='red.300'
          w='max-content'
          leftIcon={<FiLogOut />}
          variant='ghost'
          _hover={{ bg: 'gray.700' }}
          onClick={handleLogout}>
          Log out
        </Button>
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
  
      {/* <Box flex='1' overflowY='auto'></Box> */}
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
        color='gray.200'
        position='fixed'
        left={0}
        p={5}
        w='320px'
        top={0}
        h='100%'
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
              <Box display='flex' flexDirection='column' height='100%'>
                <SidebarContent user={user} handleLogout={handleLogout} />
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  };
  
  export default Sidebar;
  