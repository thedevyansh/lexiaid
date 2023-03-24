import { Box, Flex, Image, Text, Icon } from '@chakra-ui/react';
import { AiOutlineFilePdf } from 'react-icons/ai';

var re = /(?:\.([^.]+))?$/;

function UserPrompt({ prompt, pfp }) {
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
            <Text ml={2}>{prompt}</Text>
          </Flex>
        ) : (
          prompt
        )}
      </Box>
    </Flex>
  );
}

export default UserPrompt;
