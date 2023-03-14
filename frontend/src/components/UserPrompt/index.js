import { Flex, Image, Text } from '@chakra-ui/react';

function UserPrompt({ pfp }) {
  return (
    <Flex columnGap={4}>
      <Image
        boxSize='35px'
        objectFit='cover'
        src={pfp}
        fallbackSrc='https://via.placeholder.com/35'
      />
      <Text flex='1'>
        The water cycle is often taught The water cycle is often taught as a
        simple circular cycle of evaporation, condensation, and precipitation.
        Although this can be a useful model, the reality is much more
        complicated.
      </Text>
    </Flex>
  );
}

export default UserPrompt;
