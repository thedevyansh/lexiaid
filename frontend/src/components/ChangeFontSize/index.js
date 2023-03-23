import React from 'react';
import { ButtonGroup, IconButton, Text, Flex } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { BiReset } from 'react-icons/bi';

function ChangeFontSize() {
  return (
    <Flex align='center' justify='space-between'>
      <Text>Font size:</Text>
      <ButtonGroup isAttached>
        <IconButton icon={<MinusIcon />} />
        <IconButton icon={<BiReset />} />
        <IconButton icon={<AddIcon />} />
      </ButtonGroup>
    </Flex>
  );
}

export default ChangeFontSize;
