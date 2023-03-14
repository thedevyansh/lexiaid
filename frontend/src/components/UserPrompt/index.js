import { Flex, Image, Text } from '@chakra-ui/react';

function UserPrompt({ prompt, pfp }) {
  return (
    <Flex columnGap={4}>
      <Image
        boxSize='35px'
        objectFit='cover'
        src={pfp}
        fallbackSrc='https://via.placeholder.com/35'
      />
      <Text flex='1'>{prompt}</Text>
    </Flex>
  );
}

export default UserPrompt;
