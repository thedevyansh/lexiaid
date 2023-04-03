import { Button, IconButton, Tooltip } from '@chakra-ui/react';
import { IoReader } from 'react-icons/io5';

function ImmersiveReader() {
  return (
    <>
      <Tooltip label='Immersive Reader' fontSize='md'>
        <Button
          as={IconButton}
          icon={<IoReader size='25px' />}
          variant='ghost'
          colorScheme='twitter'
        />
      </Tooltip>
    </>
  );
}

export default ImmersiveReader;
