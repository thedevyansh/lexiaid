import {
  Box,
  Flex,
  Image,
  Text,
  Icon,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineFilePdf } from 'react-icons/ai';
import ImmersiveReader from '../ImmersiveReader';
import { GiSpeaker } from 'react-icons/gi';

var re = /(?:\.([^.]+))?$/;

function UserPrompt({ prompt, pfp, userPromptId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex columnGap={4}>
      <Image
        boxSize='35px'
        objectFit='cover'
        src={pfp}
        fallbackSrc='https://via.placeholder.com/35'
      />
      <Box flex='1' fontSize={{ lg: '18px' }}>
        {re.exec(prompt)[1] === 'pdf' ? (
          <Flex align='center'>
            <Icon as={AiOutlineFilePdf} boxSize={6} />
            <Text ml={2} fontStyle='italic'>
              {prompt}
            </Text>
          </Flex>
        ) : (
          prompt
        )}
      </Box>
      {re.exec(prompt)[1] !== 'pdf' ? (
        <>
          <IconButton
            icon={<GiSpeaker size='30px' />}
            colorScheme='twitter'
            variant='ghost'
            onClick={onOpen}
          />
          <ImmersiveReader
            userPromptId={userPromptId}
            isOpen={isOpen}
            onClose={onClose}
            prompt={prompt}
          />
        </>
      ) : null}
    </Flex>
  );
}

export default UserPrompt;
